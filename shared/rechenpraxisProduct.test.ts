import { describe, expect, it } from "vitest";
import {
  RECHENPRAXIS_MODULE_SENTINEL,
  RECHENPRAXIS_PRODUCT_ID,
  RECHENPRAXIS_STANDALONE_MONTHLY_EUR,
} from "./rechenpraxisProduct";

describe("rechenpraxisProduct", () => {
  it("defines standalone product", () => {
    expect(RECHENPRAXIS_PRODUCT_ID).toBe("rechenpraxis_standalone");
    expect(RECHENPRAXIS_MODULE_SENTINEL).toBe("rp");
    expect(RECHENPRAXIS_STANDALONE_MONTHLY_EUR).toBe(19);
  });
});
