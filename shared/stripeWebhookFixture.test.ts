import { describe, expect, it } from "vitest";
import { buildCheckoutCompletedFixture, buildInvoicePaidFixture } from "./stripeWebhookFixture";

describe("stripeWebhookFixture", () => {
  it("builds checkout.session.completed payload", () => {
    const fixture = buildCheckoutCompletedFixture({
      email: "buyer@example.com",
      modules: "1",
      productId: "modul_1",
    });
    expect(fixture.type).toBe("checkout.session.completed");
    expect(fixture.data.object.customer_email).toBe("buyer@example.com");
    expect(fixture.data.object.metadata).toMatchObject({ modules: "1", productId: "modul_1" });
  });

  it("builds invoice.paid renewal payload", () => {
    const fixture = buildInvoicePaidFixture({ userId: 9, type: "renewal", interval: "year" });
    expect(fixture.type).toBe("invoice.paid");
    expect(fixture.data.object.metadata).toMatchObject({ type: "renewal", userId: "9", interval: "year" });
  });
});
