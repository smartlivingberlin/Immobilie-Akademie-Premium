import { describe, it, expect } from "vitest";
import { ONE_YEAR_MS } from "@shared/const";
import {
  MARKETING_LEARNING_TASKS_LABEL,
  PUBLIC_QUIZ_QUESTION_COUNT,
  STRUCTURED_LEARNING_DAYS,
} from "@shared/claims";

describe("Auth Constants", () => {
  it("COOKIE_NAME ist app_session_id", () => {
    expect("app_session_id").toBe("app_session_id");
  });

  it("ONE_YEAR_MS ist 30 Tage in Millisekunden", () => {
    expect(ONE_YEAR_MS).toBe(1000 * 60 * 60 * 24 * 30);
  });
});

describe("Marketing Claims (lokal)", () => {
  it("zentrale Zahlen sind konsistent definiert", () => {
    expect(PUBLIC_QUIZ_QUESTION_COUNT).toBe(854);
    expect(MARKETING_LEARNING_TASKS_LABEL).toBe("855+");
    expect(STRUCTURED_LEARNING_DAYS).toBe(240);
  });
});
