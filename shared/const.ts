export const COOKIE_NAME = "app_session_id";
/** @deprecated Name historisch — Wert ist 30 Tage. Nutze SESSION_MAX_AGE_MS. */
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 30; // 30 Tage (Sicherheit)
export const SESSION_MAX_AGE_MS = ONE_YEAR_MS;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';
