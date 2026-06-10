import { Link } from "wouter";
import { ArrowRight, Building2 } from "lucide-react";
import {
  getRechenpraxisVerwalterLinks,
  hasVerwalterBezug,
  type RechenpraxisAufgabeKontext,
} from "@shared/rechenpraxisVerwalterLinks";
import { scaledFontSize as fz } from "@/lib/a11yFont";

export function RechenpraxisVerwalterHinweis({ aufgabe }: { aufgabe: RechenpraxisAufgabeKontext }) {
  if (!hasVerwalterBezug(aufgabe)) return null;

  const links = getRechenpraxisVerwalterLinks(aufgabe);

  return (
    <div
      style={{
        marginTop: "1rem",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1rem 1.25rem",
        background: "var(--color-background-secondary)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <Building2 size={16} style={{ color: "var(--color-text-success)" }} aria-hidden />
        <span style={{ fontSize: fz(14), fontWeight: 600, color: "var(--color-text-primary)" }}>
          In der Praxis umsetzen — Verwalter-Tools
        </span>
      </div>
      <p style={{ fontSize: fz(13), color: "var(--color-text-secondary)", margin: "0 0 12px", lineHeight: 1.6 }}>
        Diese Aufgabe betrifft echte Verwaltungsarbeit. Direkt verknüpfte Vorlagen und Buchungsvorlagen:
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              <a
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  padding: "10px 12px",
                  borderRadius: "var(--border-radius-md)",
                  background: "var(--color-background-primary)",
                  border: "0.5px solid var(--color-border-tertiary)",
                  textDecoration: "none",
                  minHeight: 44,
                }}
              >
                <div>
                  <div style={{ fontSize: fz(13), fontWeight: 500, color: "var(--color-text-primary)" }}>
                    {l.label}
                  </div>
                  <div style={{ fontSize: fz(11), color: "var(--color-text-secondary)", marginTop: 2 }}>
                    {l.hint}
                  </div>
                </div>
                <ArrowRight size={14} style={{ color: "var(--color-text-success)", flexShrink: 0 }} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
