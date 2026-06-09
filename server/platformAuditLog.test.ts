import { describe, expect, it } from "vitest";
import type { AuditEventType } from "./platformAuditLog";

const EVENT_TYPES: AuditEventType[] = [
  "login", "logout", "register", "module_open", "module_complete",
  "ki_call", "owner_impersonate", "owner_lock", "owner_unlock",
  "owner_set_role", "stripe_purchase",
];

describe("platformAuditLog", () => {
  it("defines all expected event types", () => {
    expect(EVENT_TYPES).toHaveLength(11);
    expect(EVENT_TYPES).toContain("ki_call");
  });
});
