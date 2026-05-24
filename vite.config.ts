import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), ...(process.env.NODE_ENV !== "production" ? [vitePluginManusDebugCollector()] : [])];

export default defineConfig({
  // _archive Verzeichnis aus Build ausschließen
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(process.cwd()),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // ── 1. React core — must load first (createContext, hooks, scheduler) ──
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react-is") ||
            id.includes("node_modules/scheduler")
          ) return "vendor-react-core";

          // ── 2. Radix UI primitives ──────────────────────────────────────────
          if (id.includes("node_modules/@radix-ui")) return "vendor-react-ui";

          // ── 3. State / data-fetching layer ──────────────────────────────────
          if (
            id.includes("node_modules/@tanstack") ||
            id.includes("node_modules/zustand") ||
            id.includes("node_modules/@trpc") ||
            id.includes("node_modules/superjson") ||
            id.includes("node_modules/wouter")
          ) return "vendor-react-state";

          // ── 4. Icons ────────────────────────────────────────────────────────
          if (id.includes("node_modules/lucide-react")) return "vendor-icons";

          // ── 5. Animation (large — only loaded when used) ────────────────────
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/motion")
          ) return "vendor-animation";

          // ── 6. Charts (recharts + d3 dependencies) ──────────────────────────
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3-") ||
            id.includes("node_modules/victory-")
          ) return "vendor-charts";

          // ── 7. Markdown / rich-text rendering ───────────────────────────────
          if (
            id.includes("node_modules/react-markdown") ||
            id.includes("node_modules/remark") ||
            id.includes("node_modules/rehype") ||
            id.includes("node_modules/unified") ||
            id.includes("node_modules/mdast") ||
            id.includes("node_modules/hast") ||
            id.includes("node_modules/micromark") ||
            id.includes("node_modules/vfile")
          ) return "vendor-markdown";

          // ── 8. PDF / document generation ────────────────────────────────────
          // pdfjs-dist, jspdf, html2canvas — dynamic import() handles splitting

          // ── 10. Date utilities ───────────────────────────────────────────────
          if (id.includes("node_modules/date-fns")) return "vendor-dates";

          // ── 11. UI extras (cmdk, vaul, sonner, input-otp) ───────────────────
          if (
            id.includes("node_modules/cmdk") ||
            id.includes("node_modules/vaul") ||
            id.includes("node_modules/sonner") ||
            id.includes("node_modules/input-otp") ||
            id.includes("node_modules/next-themes")
          ) return "vendor-ui-extras";

          // ── 12. General utilities (everything else from node_modules) ────────
          if (id.includes("node_modules/jspdf") || id.includes("node_modules/html2canvas")) return "vendor-pdf";
          if (id.includes("node_modules")) return "vendor-react-utils";

          // ── 10. Exam / quiz question data ────────────────────────────────────
          if (id.includes("all-questions")) return "data-questions";
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: "all",
    hmr: {
      clientPort: 443,
      protocol: "wss",
    },
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
