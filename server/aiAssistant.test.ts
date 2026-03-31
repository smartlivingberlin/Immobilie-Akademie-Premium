import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe.skipIf(!process.env.ANTHROPIC_API_KEY && !process.env.OPENAI_API_KEY && !process.env.GEMINI_API_KEY)("aiAssistant router", () => {
  let conversationId: number;

  it("creates a new conversation", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(conversation).toBeDefined();
    expect(conversation?.userId).toBe(1);
    expect(conversation?.moduleContext).toBe("Modul 3: Verwaltung");
    
    if (conversation) {
      conversationId = conversation.id;
    }
  });

  it("retrieves user conversations", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation first
    await caller.aiAssistant.createConversation({
      moduleContext: "Test Context",
    });

    const conversations = await caller.aiAssistant.getConversations();

    expect(conversations).toBeDefined();
    expect(Array.isArray(conversations)).toBe(true);
    expect(conversations.length).toBeGreaterThan(0);
  });

  it("sends a message and receives AI response", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation first
    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(conversation).toBeDefined();

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    // Send a message
    const response = await caller.aiAssistant.sendMessage({
      conversationId: conversation.id,
      message: "Was ist WEG-Recht?",
      moduleContext: "Modul 3: Verwaltung",
    });

    expect(response).toBeDefined();
    expect(response.message).toBeDefined();
    expect(typeof response.message).toBe("string");
    expect(response.message.length).toBeGreaterThan(0);
    expect(response.conversationId).toBe(conversation.id);
  }, 30000); // Increase timeout for LLM call

  it("retrieves conversation messages", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a conversation and send a message
    const conversation = await caller.aiAssistant.createConversation({
      moduleContext: "Test",
    });

    expect(conversation).toBeDefined();

    if (!conversation) {
      throw new Error("Failed to create conversation");
    }

    await caller.aiAssistant.sendMessage({
      conversationId: conversation.id,
      message: "Test question",
    });

    // Retrieve messages
    const messages = await caller.aiAssistant.getMessages({
      conversationId: conversation.id,
    });

    expect(messages).toBeDefined();
    expect(Array.isArray(messages)).toBe(true);
    expect(messages.length).toBeGreaterThanOrEqual(2); // User message + AI response
    
    // Check message structure
    const userMessage = messages.find(m => m.role === "user");
    const assistantMessage = messages.find(m => m.role === "assistant");
    
    expect(userMessage).toBeDefined();
    expect(assistantMessage).toBeDefined();
    expect(userMessage?.content).toBe("Test question");
  }, 30000); // Increase timeout for LLM call
});
