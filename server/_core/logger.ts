export const logger = {
  info: (msg: string, data?: any) =>
    console.log(JSON.stringify({ level: 'info', msg, data, ts: new Date().toISOString() })),

  warn: (msg: string, data?: any) =>
    console.warn(JSON.stringify({ level: 'warn', msg, data, ts: new Date().toISOString() })),

  error: (msg: string, error?: any) =>
    console.error(JSON.stringify({
      level: 'error',
      msg,
      error: error?.message ?? (typeof error === 'string' ? error : undefined),
      stack: error?.stack,
      ts: new Date().toISOString(),
    })),

  debug: (msg: string, data?: any) => {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(JSON.stringify({ level: 'debug', msg, data, ts: new Date().toISOString() }));
    }
  },
};
