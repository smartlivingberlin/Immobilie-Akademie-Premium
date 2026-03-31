import { describe, it, expect, beforeAll } from "vitest";
import { createCertificate, getUserCertificates, getCertificateByExamSession } from "./certificates";
import { upsertUser, createExamSession } from "./db";

describe("Certificate Generation", () => {
  let testUserId: number;
  let passedSessionId: number;
  let failedSessionId: number;

  beforeAll(async () => {
    // Create test user
    await upsertUser({
      openId: "test-cert-user-123",
      name: "Max Mustermann",
      email: "max@example.com",
      loginMethod: "test",
    });

    // Get user ID
    const { getDb } = await import("./db");
    const db = await getDb();
    if (!db) throw new Error("Database not available");

    const { users } = await import("../drizzle/schema");
    const { eq } = await import("drizzle-orm");
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.openId, "test-cert-user-123"))
      .limit(1);

    testUserId = user.id;

    // Create passed exam session (score >= 70%)
    const passedSession = await createExamSession(
      testUserId,
      2, // moduleId
      50, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!passedSession) throw new Error("Failed to create passed session");
    passedSessionId = passedSession.id;

    // Update session to completed with passing score
    const { examSessions } = await import("../drizzle/schema");
    await db
      .update(examSessions)
      .set({
        status: "completed" as const,
        score: 85,
        correctAnswers: 43,
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, Number(passedSessionId)));

    // Create failed exam session (score < 70%)
    const failedSession = await createExamSession(
      testUserId,
      2, // moduleId
      50, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!failedSession) throw new Error("Failed to create failed session");
    failedSessionId = failedSession.id;

    // Update session to completed with failing score
    await db
      .update(examSessions)
      .set({
        status: "completed" as const,
        score: 55,
        correctAnswers: 28,
        completedAt: new Date(),
      })
      .where(eq(examSessions.id, Number(failedSessionId)));
  });

  it("should generate certificate for passed exam (score >= 70%)", async () => {
    const result = await createCertificate(testUserId, passedSessionId);

    expect(result).not.toBeNull();
    expect(result?.certificateId).toBeGreaterThan(0);
    // URL kann S3 (https://) oder lokaler Storage (/api/storage/) sein
    expect(result?.pdfUrl).toMatch(/https:\/\/|\/api\/storage\//);
    expect(result?.pdfUrl).toContain(".pdf");
  });

  it("should not generate certificate for failed exam (score < 70%)", async () => {
    const result = await createCertificate(testUserId, failedSessionId);

    expect(result).toBeNull();
  });

  it("should return existing certificate if already generated", async () => {
    // First generation
    const result1 = await createCertificate(testUserId, passedSessionId);
    expect(result1).not.toBeNull();

    // Second generation (should return existing)
    const result2 = await createCertificate(testUserId, passedSessionId);
    expect(result2).not.toBeNull();
    expect(result2?.certificateId).toBe(result1?.certificateId);
    expect(result2?.pdfUrl).toBe(result1?.pdfUrl);
  });

  it("should retrieve all certificates for a user", async () => {
    const certificates = await getUserCertificates(testUserId);

    expect(certificates).toBeInstanceOf(Array);
    expect(certificates.length).toBeGreaterThan(0);
    expect(certificates[0]).toHaveProperty("userId");
    expect(certificates[0]).toHaveProperty("pdfUrl");
    expect(certificates[0]).toHaveProperty("score");
  });

  it("should retrieve certificate by exam session", async () => {
    const certificate = await getCertificateByExamSession(passedSessionId);

    expect(certificate).not.toBeNull();
    expect(certificate?.examSessionId).toBe(passedSessionId);
    expect(certificate?.userId).toBe(testUserId);
    expect(certificate?.score).toBeGreaterThanOrEqual(70);
  });

  it("should return null for non-existent exam session certificate", async () => {
    const certificate = await getCertificateByExamSession(failedSessionId);

    expect(certificate).toBeNull();
  });

  it("should include correct module information in certificate", async () => {
    const certificate = await getCertificateByExamSession(passedSessionId);

    expect(certificate).not.toBeNull();
    expect(certificate?.moduleId).toBe(2);
    expect(certificate?.moduleName).toContain("Modul 2");
    expect(certificate?.moduleName).toContain("Maklerrecht");
  });
});
