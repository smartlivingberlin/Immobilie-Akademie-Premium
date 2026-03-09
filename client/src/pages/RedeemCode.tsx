import { useState } from "react";
import { trpc } from "@/lib/trpc";

export default function RedeemCode() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const redeem = trpc.modules.redeemCode.useMutation({
    onSuccess: (data) => {
      if (data.ok) {
        setResult({ ok: true, message: `✅ Code eingelöst! Freigeschaltete Module: ${(data.enabledModules ?? []).join(", ")}` });
        setCode("");
      } else {
        setResult({ ok: false, message: `❌ ${data.error}` });
      }
    },
    onError: (e) => {
      setResult({ ok: false, message: `❌ Fehler: ${e.message}` });
    },
  });

  const handleSubmit = () => {
    if (!code.trim()) return;
    setResult(null);
    redeem.mutate({ code: code.trim() });
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold mb-2">Freischalt-Code einlösen</h1>
      <p className="text-slate-500 text-sm mb-6">
        Gib deinen Zugangscode ein um neue Module freizuschalten.
      </p>

      <div className="space-y-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Z.B. MAKLER-2026-XYZ"
          className="w-full border rounded-lg px-4 py-3 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={redeem.isPending || !code.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
        >
          {redeem.isPending ? "Wird geprüft..." : "Code einlösen"}
        </button>
      </div>

      {result && (
        <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${result.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {result.message}
        </div>
      )}

      <p className="text-xs text-slate-400 mt-6 text-center">
        Codes erhalten Sie nach dem Kauf eines Kurses per E-Mail.
      </p>
    </div>
  );
}
