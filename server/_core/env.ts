// ── Pflicht-Variablen prüfen beim Start ────────────────────────────
const REQUIRED_ENV: string[] = ["DATABASE_URL", "JWT_SECRET", "STRIPE_SECRET_KEY"];
const OPTIONAL_ENV: string[] = ["ANTHROPIC_API_KEY", "GOOGLE_AI_API_KEY", "GROQ_API_KEY",
  "GMAIL_USER", "SENTRY_DSN", "VITE_GA_MEASUREMENT_ID", "ELEVENLABS_API_KEY"];

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`[FATAL] Pflicht-Umgebungsvariable fehlt: ${key}`);
    console.error("[FATAL] Server wird beendet. Bitte .env konfigurieren.");
    process.exit(1);
  }
}
for (const key of OPTIONAL_ENV) {
  if (!process.env[key]) {
    console.warn(`[WARN] Optionale Variable nicht gesetzt: ${key}`);
  }
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  ownerMagicCode: process.env.OWNER_MAGIC_CODE ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};
