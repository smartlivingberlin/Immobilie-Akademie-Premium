/**
 * storage.ts – Universeller Dateispeicher
 *
 * Auf Manus: Nutzt Manus Storage-Proxy (BUILT_IN_FORGE_API_URL)
 * Auf jedem anderen Host: Speichert lokal im .data/uploads-Ordner
 *
 * API identisch – kein anderer Code muss geändert werden.
 */

import { ENV } from "./_core/env";
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";

const LOCAL_UPLOAD_DIR = join(process.cwd(), ".data", "uploads");

function ensureUploadDir() {
  if (!existsSync(LOCAL_UPLOAD_DIR)) mkdirSync(LOCAL_UPLOAD_DIR, { recursive: true });
}

function sanitizeKey(key: string): string {
  return key.replace(/\.\./g, "").replace(/^\//, "").replace(/[\/\\]/g, "_");
}

function isManusConfigured(): boolean {
  return Boolean(ENV.forgeApiUrl && ENV.forgeApiKey);
}

function authHeaders(apiKey: string) {
  return { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/octet-stream" };
}

async function manusUpload(key: string, body: Buffer, contentType: string): Promise<string> {
  const base = ENV.forgeApiUrl.replace(/\/+$/, "");
  const url = new URL("v1/storage/upload", base + "/");
  url.searchParams.set("path", key);
  const r = await fetch(url.toString(), {
    method: "PUT",
    headers: { Authorization: `Bearer ${ENV.forgeApiKey}`, "Content-Type": contentType },
    body: body as BodyInit,
  });
  if (!r.ok) throw new Error(`Upload failed: ${r.statusText}`);
  const dlUrl = new URL("v1/storage/downloadUrl", base + "/");
  dlUrl.searchParams.set("path", key);
  const dlR = await fetch(dlUrl.toString(), { headers: authHeaders(ENV.forgeApiKey) });
  const dlData = await dlR.json() as { url?: string };
  return dlData.url ?? `${base}/v1/storage/download?path=${encodeURIComponent(key)}`;
}

/** Datei hochladen → gibt URL zurück */
export async function storagePut(key: string, body: Buffer, contentType = "application/octet-stream"): Promise<string> {
  if (isManusConfigured()) return manusUpload(key, body, contentType);
  ensureUploadDir();
  const safeKey = sanitizeKey(key);
  writeFileSync(join(LOCAL_UPLOAD_DIR, safeKey), body);
  return `/api/storage/${encodeURIComponent(safeKey)}`;
}

/** Datei lesen */
export async function storageGet(key: string): Promise<Buffer | null> {
  if (!isManusConfigured()) {
    const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(key));
    return existsSync(path) ? readFileSync(path) : null;
  }
  const base = ENV.forgeApiUrl.replace(/\/+$/, "");
  const dlUrl = new URL("v1/storage/downloadUrl", base + "/");
  dlUrl.searchParams.set("path", key);
  const dlR = await fetch(dlUrl.toString(), { headers: authHeaders(ENV.forgeApiKey) });
  const { url } = await dlR.json() as { url?: string };
  if (!url) return null;
  const r = await fetch(url);
  return r.ok ? Buffer.from(await r.arrayBuffer()) : null;
}

/** Datei löschen */
export async function storageDelete(key: string): Promise<void> {
  if (isManusConfigured()) {
    const base = ENV.forgeApiUrl.replace(/\/+$/, "");
    const url = new URL("v1/storage/delete", base + "/");
    url.searchParams.set("path", key);
    await fetch(url.toString(), { method: "DELETE", headers: authHeaders(ENV.forgeApiKey) });
    return;
  }
  const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(key));
  if (existsSync(path)) unlinkSync(path);
}

/** Lokale Storage-Route registrieren (nur ohne Manus) */
export function registerStorageRoute(app: import("express").Express) {
  if (isManusConfigured()) return;
  const MIME: Record<string, string> = { pdf: "application/pdf", png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", svg: "image/svg+xml" };
  app.get("/api/storage/:key", (req, res) => {
    const path = join(LOCAL_UPLOAD_DIR, sanitizeKey(decodeURIComponent(req.params.key)));
    if (!existsSync(path)) return res.status(404).json({ error: "Nicht gefunden" });
    const ext = path.split(".").pop()?.toLowerCase() ?? "";
    res.setHeader("Content-Type", MIME[ext] ?? "application/octet-stream");
    return res.sendFile(path);
  });
}
