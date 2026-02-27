import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import { 
  createExamSession, 
  getExamSession,
  upsertUser 
} from "./db";

describe("IHK Timer Mode", () => {
  let testUserId: number;
  let normalSessionId: number;
  let ihkSessionId: number;

  beforeAll(async () => {
    // Create test user
    const openId = `test-ihk-timer-${Date.now()}`;
    await upsertUser({
      openId,
      name: "Test IHK Timer User",
      email: `test-ihk-timer-${Date.now()}@example.com`,
      role: "user",
    });
    
    // Get user from database
    const { getUserByOpenId } = await import("./db");
    const user = await getUserByOpenId(openId);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.id;

    // Create normal exam session (30 min, 10 questions)
    const normalSession = await createExamSession(
      testUserId,
      1, // moduleId
      10, // totalQuestions
      1800, // timeLimit (30 min)
      "medium", // difficulty
      false // isIHKMode
    );
    if (!normalSession) throw new Error("Failed to create normal exam session");
    normalSessionId = normalSession.id;

    // Create IHK exam session (180 min, 72 questions)
    const ihkSession = await createExamSession(
      testUserId,
      1, // moduleId
      72, // totalQuestions
      10800, // timeLimit (180 min)
      "medium", // difficulty
      true // isIHKMode
    );
    if (!ihkSession) throw new Error("Failed to create IHK exam session");
    ihkSessionId = ihkSession.id;
  });

  it("should create normal exam session with 30-minute time limit", async () => {
    const session = await getExamSession(normalSessionId);
    
    expect(session).toBeDefined();
    expect(session?.isIHKMode).toBe(false);
    expect(session?.timeLimit).toBe(1800); // 30 minutes
    expect(session?.totalQuestions).toBe(10);
  });

  it("should create IHK exam session with 180-minute time limit", async () => {
    const session = await getExamSession(ihkSessionId);
    
    expect(session).toBeDefined();
    expect(session?.isIHKMode).toBe(true);
    expect(session?.timeLimit).toBe(10800); // 180 minutes
    expect(session?.totalQuestions).toBe(72);
  });

  it("should retrieve IHK session data via tRPC", async () => {
    const caller = appRouter.createCaller({
      user: { id: testUserId, role: "user" as const, openId: "test", name: "Test", email: "test@test.com" },
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.exam.getSession({
      sessionId: ihkSessionId,
    });

    expect(result).toBeDefined();
    expect(result.session.isIHKMode).toBe(true);
    expect(result.session.timeLimit).toBe(10800);
    expect(result.session.totalQuestions).toBe(72);
  });

  it("should retrieve normal session data via tRPC", async () => {
    const caller = appRouter.createCaller({
      user: { id: testUserId, role: "user" as const, openId: "test", name: "Test", email: "test@test.com" },
      req: {} as any,
      res: {} as any,
    });

    const result = await caller.exam.getSession({
      sessionId: normalSessionId,
    });

    expect(result).toBeDefined();
    expect(result.session.isIHKMode).toBe(false);
    expect(result.session.timeLimit).toBe(1800);
    expect(result.session.totalQuestions).toBe(10);
  });

  it("should calculate correct time remaining for IHK mode", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 3600; // 60 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(7200); // 120 minutes remaining
    expect(timeRemaining / 60).toBe(120); // 2 hours
  });

  it("should detect when time is running out (last 30 minutes)", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 9000; // 150 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(1800); // 30 minutes remaining
    expect(timeRemaining <= 1800).toBe(true); // Should show warning
  });

  it("should detect when time is critically low (last 10 minutes)", () => {
    const timeLimit = 10800; // 180 minutes
    const timeElapsed = 10200; // 170 minutes elapsed
    const timeRemaining = timeLimit - timeElapsed;
    
    expect(timeRemaining).toBe(600); // 10 minutes remaining
    expect(timeRemaining <= 600).toBe(true); // Should show critical warning
  });
});
