import { logger } from "./_core/logger";
import type { StripeWebhookEvent } from "./stripeWebhookProcess";
import {
  claimStripeWebhookEvent,
  evaluateStripeWebhookReplayEligibility,
  getStripeWebhookRecoveryEventById,
  markStripeWebhookEventFailed,
  markStripeWebhookEventProcessed,
} from "./stripeWebhookLedger";
import { auditRequestMeta, recordPlatformAudit } from "./platformAuditLog";
import type { Request } from "express";

type DbConn = { $client: { query: Function } };

export const STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE = "REPLAY_STRIPE_WEBHOOK_EVENT";

const lastActualReplayByAdmin = new Map<number, number>();

export function isStripeWebhookManualReplayEnabled(): boolean {
  const value = process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_ENABLED;
  return value === "1" || value === "true";
}

export function getStripeWebhookManualReplayRateLimitSeconds(): number {
  const raw = process.env.STRIPE_WEBHOOK_MANUAL_REPLAY_RATE_LIMIT_SECONDS;
  const parsed = parseInt(raw || "60", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
}

/** Test-Helfer: setzt In-Memory-Rate-Limit zurück. */
export function resetStripeWebhookReplayRateLimitForTests(): void {
  lastActualReplayByAdmin.clear();
}

export type StripeWebhookReplayActor = {
  id?: number;
  email?: string;
  role?: string;
  name?: string;
};

export type StripeWebhookReplayHttpResult = {
  status: number;
  body: Record<string, unknown>;
};

export function normalizeStripeWebhookReplayEvent(raw: unknown): StripeWebhookEvent {
  if (!raw || typeof raw !== "object") {
    throw new Error("Event object required");
  }
  const event = raw as Record<string, unknown>;
  const id = typeof event.id === "string" ? event.id.trim() : "";
  const type = typeof event.type === "string" ? event.type.trim() : "";
  const data = event.data as { object?: Record<string, unknown> } | undefined;
  const object = data?.object;
  if (!id) throw new Error("event.id required");
  if (!type) throw new Error("event.type required");
  if (!object || typeof object !== "object") throw new Error("event.data.object required");
  return { id, type, data: { object } };
}

export function validateReplayEventMatchesLedger(
  event: StripeWebhookEvent,
  ledger: NonNullable<Awaited<ReturnType<typeof getStripeWebhookRecoveryEventById>>>,
): string | null {
  if (event.id !== ledger.eventId) return "event_id_mismatch";
  if (event.type !== ledger.eventType) return "event_type_mismatch";
  const objectId = event.data.object?.id;
  if (ledger.objectId) {
    if (typeof objectId !== "string" || objectId !== ledger.objectId) {
      return "object_id_mismatch";
    }
  }
  return null;
}

function auditReplayAttempt(
  actor: StripeWebhookReplayActor,
  eventId: string,
  eventType: string,
  objectId: string | null,
  dryRun: boolean,
  result: string,
  req?: Request,
  extra?: Record<string, unknown>,
): void {
  recordPlatformAudit({
    eventType: "stripe_webhook_replay",
    actorUserId: actor.id ?? null,
    actorEmail: actor.email || (typeof actor.name === "string" ? actor.name : null),
    actorRole: actor.role ?? null,
    resourceType: "stripe_webhook_event",
    resourceId: eventId,
    meta: {
      eventType,
      objectId,
      dryRun,
      result,
      ...extra,
    },
    ...auditRequestMeta(req),
  });
}

function isRateLimited(actorUserId: number): boolean {
  const last = lastActualReplayByAdmin.get(actorUserId);
  if (!last) return false;
  const windowMs = getStripeWebhookManualReplayRateLimitSeconds() * 1000;
  return Date.now() - last < windowMs;
}

function recordActualReplay(actorUserId: number): void {
  lastActualReplayByAdmin.set(actorUserId, Date.now());
}

export async function handleStripeWebhookReplayRequest(options: {
  db: DbConn;
  body: unknown;
  actor: StripeWebhookReplayActor;
  req?: Request;
}): Promise<StripeWebhookReplayHttpResult> {
  const { db, body, actor, req } = options;
  const payload = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const dryRun = payload.dryRun !== false;
  const confirm = typeof payload.confirm === "string" ? payload.confirm : "";

  let event: StripeWebhookEvent;
  try {
    event = normalizeStripeWebhookReplayEvent(payload.event);
  } catch (err: any) {
    return { status: 400, body: { error: err.message || "invalid_event" } };
  }

  const ledger = await getStripeWebhookRecoveryEventById(db, event.id);
  const eligibility = evaluateStripeWebhookReplayEligibility(ledger);

  if (!ledger || eligibility.eligible === false && eligibility.reason === "missing") {
    auditReplayAttempt(actor, event.id, event.type, getObjectId(event), dryRun, "missing", req);
    return { status: 404, body: { error: "ledger_event_not_found", eventId: event.id } };
  }

  if (eligibility.eligible === false && eligibility.reason === "processed") {
    auditReplayAttempt(actor, event.id, event.type, ledger?.objectId ?? null, dryRun, "processed", req);
    return { status: 409, body: { error: "already_processed", eventId: event.id } };
  }

  if (eligibility.eligible === false && eligibility.reason === "fresh_processing") {
    auditReplayAttempt(actor, event.id, event.type, ledger?.objectId ?? null, dryRun, "fresh_processing", req);
    return { status: 409, body: { error: "processing_not_stale", eventId: event.id } };
  }

  const mismatch = ledger ? validateReplayEventMatchesLedger(event, ledger) : "ledger_event_not_found";
  if (mismatch) {
    auditReplayAttempt(actor, event.id, event.type, ledger?.objectId ?? null, dryRun, mismatch, req);
    return { status: 400, body: { error: mismatch, eventId: event.id } };
  }

  if (dryRun) {
    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, true, "eligible", req, {
      eligibilityReason: eligibility.eligible ? eligibility.reason : undefined,
    });
    return {
      status: 200,
      body: {
        dryRun: true,
        eligible: true,
        eventId: event.id,
        eligibilityReason: eligibility.eligible ? eligibility.reason : null,
      },
    };
  }

  if (!isStripeWebhookManualReplayEnabled()) {
    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, "disabled", req);
    return { status: 403, body: { error: "manual_replay_disabled" } };
  }

  if (confirm !== STRIPE_WEBHOOK_REPLAY_CONFIRM_PHRASE) {
    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, "confirm_required", req);
    return { status: 400, body: { error: "confirm_phrase_required" } };
  }

  const actorUserId = actor.id;
  if (!actorUserId) {
    return { status: 400, body: { error: "actor_user_id_required" } };
  }

  if (isRateLimited(actorUserId)) {
    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, "rate_limited", req);
    return { status: 429, body: { error: "rate_limited" } };
  }

  recordActualReplay(actorUserId);

  try {
    const claim = await claimStripeWebhookEvent(db, event);
    if (!claim.shouldProcess) {
      auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, claim.reason, req);
      return { status: 409, body: { error: claim.reason, eventId: event.id } };
    }

    const { processStripeWebhookEvent } = await import("./stripeWebhookProcess");
    await processStripeWebhookEvent(db, event);
    await markStripeWebhookEventProcessed(db, event.id);

    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, "replayed", req, {
      claimReason: claim.reason,
    });

    return {
      status: 200,
      body: {
        dryRun: false,
        replayed: true,
        status: "processed",
        eventId: event.id,
        claimReason: claim.reason,
      },
    };
  } catch (err: any) {
    logger.error("[Stripe Webhook Replay] Verarbeitung fehlgeschlagen", err);
    try {
      await markStripeWebhookEventFailed(db, event.id, err);
    } catch (markErr: any) {
      logger.error("[Stripe Webhook Replay] failed-mark fehlgeschlagen", markErr);
    }
    auditReplayAttempt(actor, event.id, event.type, ledger!.objectId, false, "processing_failed", req, {
      message: err?.message || "processing_failed",
    });
    return { status: 500, body: { error: "processing_failed", eventId: event.id } };
  }
}

function getObjectId(event: StripeWebhookEvent): string | null {
  const objectId = event.data.object?.id;
  return typeof objectId === "string" && objectId.length > 0 ? objectId : null;
}
