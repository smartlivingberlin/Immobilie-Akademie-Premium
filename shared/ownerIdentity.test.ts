import { describe, expect, it } from "vitest";
import { isPlatformOwnerOpenId, resolveOwnerOpenId } from "./ownerIdentity";

describe("ownerIdentity", () => {
  it("resolves default owner openId from email", () => {
    expect(resolveOwnerOpenId()).toBe("local:alisadgadyri38@gmail.com");
  });

  it("prefers explicit OWNER_OPEN_ID", () => {
    expect(resolveOwnerOpenId({ ownerOpenId: "local:custom@example.com" })).toBe(
      "local:custom@example.com",
    );
  });

  it("matches platform owner only", () => {
    expect(isPlatformOwnerOpenId("local:alisadgadyri38@gmail.com")).toBe(true);
    expect(isPlatformOwnerOpenId("local:other-admin@example.com")).toBe(false);
  });
});
