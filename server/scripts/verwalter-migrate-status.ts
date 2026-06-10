/**
 * Migrations-Status lokal/prüfen (DATABASE_URL in .env).
 * Usage: pnpm run ops:verwalter-migrate-status
 */
import "dotenv/config";
import { getMigrationStatus } from "../migrate";

async function main() {
  const status = await getMigrationStatus();
  if (!status) {
    console.error("DATABASE_URL fehlt — in .env oder Railway setzen.");
    process.exit(1);
  }
  console.log(JSON.stringify(status, null, 2));
  if (status.pending > 0) {
    console.error("\nAusstehend:", status.pendingFiles.join(", "));
    process.exit(2);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
