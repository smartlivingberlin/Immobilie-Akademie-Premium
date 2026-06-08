import { describe, expect, it } from "vitest";
import {
  EMAIL_VERIFICATION_GRACE_DAYS,
  isEmailVerificationBlocked,
  createEmailVerificationToken,
  parseEmailVerificationToken,
} from "./emailVerification";

process.env.JWT_SECRET ??= "test-jwt-secret-minimum-32-characters!!";

describe("emailVerification", () => {
  it("allows unverified users within grace period", () => {
    const recent = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    expect(
      isEmailVerificationBlocked({
        role: "user",
        emailVerifiedAt: null,
        createdAt: recent,
      }),
    ).toBe(false);
  });

  it("blocks unverified users after grace period", () => {
    const old = new Date(
      Date.now() - (EMAIL_VERIFICATION_GRACE_DAYS + 1) * 24 * 60 * 60 * 1000,
    );
    expect(
      isEmailVerificationBlocked({
        role: "user",
        emailVerifiedAt: null,
        createdAt: old,
      }),
    ).toBe(true);
  });

  it("never blocks admins or verified users", () => {
    const old = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(
      isEmailVerificationBlocked({
        role: "admin",
        emailVerifiedAt: null,
        createdAt: old,
      }),
    ).toBe(false);
    expect(
      isEmailVerificationBlocked({
        role: "user",
        emailVerifiedAt: new Date(),
        createdAt: old,
      }),
    ).toBe(false);
  });

  it("creates and parses verification tokens", async () => {
    const token = await createEmailVerificationToken("local:test@example.com");
    const parsed = await parseEmailVerificationToken(token);
    expect(parsed?.openId).toBe("local:test@example.com");
  });
});
