import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 ARM64 WSL TLS-Fix
const BASE = 'https://immobilien-akademie-smart.de';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Aufwärmen: 0→5 Nutzer
    { duration: '1m', target: 20 },   // Last: 20 gleichzeitige Nutzer
    { duration: '30s', target: 50 },  // Spitze: 50 Nutzer
    { duration: '30s', target: 0 },   // Abkühlen
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // 95% unter 3 Sekunden
    http_req_failed: ['rate<0.05'],    // Fehlerrate unter 5%
  },
};

export default function () {
  // Homepage
  let r = http.get(`${BASE}/`);
  check(r, { 'Homepage 200': (r) => r.status === 200 });
  sleep(1);

  // API Health
  r = http.get(`${BASE}/api/health`);
  check(r, { 'Health 200': (r) => r.status === 200 });
  sleep(0.5);

  // Stripe Produkte
  r = http.get(`${BASE}/api/stripe/products`);
  check(r, { 'Produkte 200': (r) => r.status === 200 });
  sleep(0.5);

  // Portal Phase
  r = http.get(`${BASE}/api/portal-phase`);
  check(r, { 'Phase 200': (r) => r.status === 200 });
  sleep(1);
}
