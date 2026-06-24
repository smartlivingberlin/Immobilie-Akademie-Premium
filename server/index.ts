import express from "express";
import fs from "node:fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const portalMode = process.env.PORTAL_MODE ?? "akademie";

  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(staticPath, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");
    const injected = html.replace(
      "</head>",
      `<script>window.__PORTAL_MODE__="${portalMode}";</script></head>`,
    );
    res.type("html").send(injected);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
  });
}

startServer().catch(console.error);
