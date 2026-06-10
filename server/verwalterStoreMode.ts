/** File-Store nur für Tests / lokale Entwicklung ohne DATABASE_URL. */
export function verwalterUsesFileStore(): boolean {
  return process.env.VERWALTER_FILE_STORE === "1" || !process.env.DATABASE_URL;
}
