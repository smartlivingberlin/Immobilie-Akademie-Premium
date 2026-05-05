import sharp from "sharp";
import fs from "node:fs";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#1e3a5f"/>
  <rect x="40" y="40" width="432" height="432" rx="60" fill="#2563eb"/>
  <text x="256" y="320" font-family="Arial,sans-serif" font-size="280" font-weight="bold" 
    text-anchor="middle" fill="white">I</text>
  <text x="256" y="420" font-family="Arial,sans-serif" font-size="72" 
    text-anchor="middle" fill="#93c5fd" letter-spacing="2">AKADEMIE</text>
</svg>`;

const svgBuffer = Buffer.from(svg);

await sharp(svgBuffer).resize(192, 192).png().toFile("client/public/icon-192.png");
console.log("✓ icon-192.png");

await sharp(svgBuffer).resize(512, 512).png().toFile("client/public/icon-512.png");
console.log("✓ icon-512.png");

// Apple Touch Icon (180x180)
await sharp(svgBuffer).resize(180, 180).png().toFile("client/public/apple-touch-icon.png");
console.log("✓ apple-touch-icon.png");

// Screenshot Placeholder (1280x720)
const screenshotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#0f172a"/>
  <text x="640" y="360" font-family="Arial,sans-serif" font-size="48" 
    text-anchor="middle" fill="#2563eb">Immobilien Akademie Smart</text>
  <text x="640" y="430" font-family="Arial,sans-serif" font-size="28" 
    text-anchor="middle" fill="#64748b">IHK-Prüfungsvorbereitung</text>
</svg>`;

await sharp(Buffer.from(screenshotSvg)).resize(1280, 720).png().toFile("client/public/screenshot-dashboard.png");
console.log("✓ screenshot-dashboard.png");

// Validierung
for (const f of ["icon-192.png","icon-512.png","apple-touch-icon.png","screenshot-dashboard.png"]) {
  const size = fs.statSync(`client/public/${f}`).size;
  console.log(`  ${f}: ${Math.round(size/1024)} KB`);
}
