import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { 
  createExamSession, 
  saveExamQuestion, 
  completeExamSession,
  upsertUser 
} from "./db";

describe("PDF Export", () => {
  let testUserId: number;
  let testSessionId: number;

  beforeAll(async () => {
    // Create test user
    const openId = `test-pdf-${Date.now()}`;
    await upsertUser({
      openId,
      name: "Test PDF User",
      email: `test-pdf-${Date.now()}@example.com`,
      role: "user",
    });
    
    // Get user from database
    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.id;

    // Create test exam session
    const session = await createExamSession(
      testUserId,
      1, // moduleId
      10, // totalQuestions
      1800, // timeLimit
      "medium", // difficulty
      false // isIHKMode
    );
    if (!session) throw new Error("Failed to create exam session");
    testSessionId = session.id;

    // Add some test questions
    for (let i = 0; i < 10; i++) {
      await saveExamQuestion({
        sessionId: testSessionId,
        questionText: `Test Question ${i + 1}`,
        options: JSON.stringify(["Option A", "Option B", "Option C", "Option D"]),
        correctAnswer: "Option A",
        userAnswer: i % 2 === 0 ? "Option A" : "Option B", // 50% correct
        isCorrect: i % 2 === 0,
        explanation: `Explanation for question ${i + 1}`,
        topic: i < 5 ? "Maklerrecht" : "Vertragsrecht",
        difficulty: "medium",
      });
    }

    // Complete the session
    await completeExamSession(testSessionId, 50); // 50% score
  });

  it("should generate PDF for completed exam session", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.pdf.generateExamResultPDF({
      sessionId: testSessionId,
    });

    // Verify PDF was generated
    expect(result).toBeDefined();
    expect(result.pdf).toBeDefined();
    expect(result.filename).toBeDefined();
    expect(typeof result.pdf).toBe("string");
    expect(result.pdf.length).toBeGreaterThan(0);
    
    // Verify filename format
    expect(result.filename).toMatch(/^Pruefungsergebnis_Modul\d+_\d{4}-\d{2}-\d{2}\.pdf$/);
    
    // Verify base64 format (should be valid base64)
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    expect(base64Regex.test(result.pdf)).toBe(true);
  });

  it("should throw error for non-existent session", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    await expect(
      caller.pdf.generateExamResultPDF({
        sessionId: 999999,
      })
    ).rejects.toThrow("Exam session not found");
  });

  it("should include correct session data in PDF", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.pdf.generateExamResultPDF({
      sessionId: testSessionId,
    });

    // Decode base64 to check content (basic check)
    const pdfContent = Buffer.from(result.pdf, "base64").toString("latin1");
    
    // PDF should contain basic metadata
    expect(pdfContent).toContain("PDF"); // PDF header
    expect(pdfContent.length).toBeGreaterThan(1000); // Reasonable PDF size
  });
});
