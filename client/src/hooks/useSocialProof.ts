import { useState, useEffect } from "react";

interface SocialProofData {
  activeUsers: number;
  certsThisWeek: number;
  totalUsers: number;
}

export function useSocialProof() {
  const [data, setData] = useState<SocialProofData>({
    activeUsers: 0,      // Fallback-Werte
    certsThisWeek: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetch("/api/stats/public")
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {}); // Fallback bleibt
  }, []);

  return data;
}
