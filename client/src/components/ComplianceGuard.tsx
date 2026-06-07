import { useAuth } from "@/_core/hooks/useAuth";
import { hasWeiterbildungsnachweisAccess } from "@shared/compliance";
import { Link } from "wouter";
import { FileCheck } from "lucide-react";

export default function ComplianceGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return null;

  const complianceExpiresAt = (user as { complianceExpiresAt?: string }).complianceExpiresAt;
  if (hasWeiterbildungsnachweisAccess({ ...user, complianceExpiresAt })) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-4 text-center">
      <FileCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-slate-900 mb-2">Weiterbildungsnachweis freischalten</h2>
      <p className="text-slate-600 text-sm mb-6">
        Der §15b MaBV-Nachweis ist mit Modulkauf oder dem Compliance-Abo (249 €/Jahr) verfügbar.
      </p>
      <Link href="/compliance-20h">
        <span className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl text-sm cursor-pointer">
          Compliance-Abo ansehen →
        </span>
      </Link>
    </div>
  );
}
