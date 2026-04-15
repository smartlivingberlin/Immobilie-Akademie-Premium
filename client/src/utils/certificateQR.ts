export function generateCertificateQR(userId: number, moduleId: number, score: number): string {
  const data = btoa(`${userId}-${moduleId}-${score}-${Date.now()}`);
  const verifyUrl = `${window.location.origin}/verify-cert/${data}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(verifyUrl)}`;
}
