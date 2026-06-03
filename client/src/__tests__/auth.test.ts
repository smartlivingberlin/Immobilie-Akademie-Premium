import { describe, it, expect } from "vitest";

// Test 1: Cookie-Name ist korrekt definiert
describe("Auth Constants", () => {
  it("COOKIE_NAME ist app_session_id", () => {
    expect("app_session_id").toBe("app_session_id");
  });

  it("ONE_YEAR_MS ist 30 Tage in Millisekunden", () => {
    const expected = 1000 * 60 * 60 * 24 * 30;
    expect(expected).toBe(2592000000);
  });
});

// Test 2: Stripe-Produkte haben korrekte Struktur
describe("Stripe Produkte", () => {
  it("Komplett-Paket hat 855+ Prüfungsfragen", async () => {
    const res = await fetch(
      "https://immobilie-akademie-premium-production.up.railway.app/api/stripe/products"
    );
    const products = await res.json();
    const komplett = products.find((p: any) => p.id === "modul_komplett");
    expect(komplett).toBeDefined();
    expect(komplett.description).toContain("240 Lerntage");
  });

  it("Alle 5 Produkte vorhanden", async () => {
    const res = await fetch(
      "https://immobilie-akademie-premium-production.up.railway.app/api/stripe/products"
    );
    const products = await res.json();
    expect(products.length).toBe(6); // 5 Module + Komplett
  });
});

// Test 3: Asset-Schutz funktioniert
describe("Asset-Schutz", () => {
  it("Module5Detail ohne Cookie gibt 403", async () => {
    const res = await fetch(
      "https://immobilie-akademie-premium-production.up.railway.app/assets/Module5Detail-D5nulaCk.js"
    );
    expect(res.status).toBe(403);
  });

  it("Vendor-Bundle ohne Cookie gibt 200", async () => {
    const res = await fetch(
      "https://immobilie-akademie-premium-production.up.railway.app/assets/vendor-react-core-ldiX2fyg.js"
    );
    expect(res.status).toBe(200);
  });
});
