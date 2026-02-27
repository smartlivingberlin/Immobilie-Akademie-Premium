import { webcrypto } from "node:crypto";

if (!globalThis.crypto) {
  // Node 18 Fix für jose auf Railway
  // @ts-ignore
  globalThis.crypto = webcrypto;
}
