import { useState, useEffect } from "react";

interface SocialProofData {
  activeUsers: number;
  certsThisWeek: number;
  totalUsers: number;
}

export function useSocialProof() {
  const [data, setData] = useState<SocialProofData>({
    activeUsers: 47,      // Fallback-Werte
    certsThisWeek: 12,
    totalUsers: 312,
  });

  useEffect(() => {
    fetch("/api/stats/public")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {}); // Fallback bleibt
  }, []);

  return data;
}
