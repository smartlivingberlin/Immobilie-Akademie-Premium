import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function PublicHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/kurse", label: "Kurse" },
    { href: "/pakete", label: "Pakete 💰" },
    { href: "/lehrplan", label: "Lehrplan" },
    { href: "/rechner", label: "Rechner" },
    { href: "/hilfe", label: "Hilfe" },
  ];

  return (
    <header style={{
      background: "#0f172a",
      borderBottom: "1px solid #1e293b",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 20px",
        display: "flex", alignItems: "center",
        height: 64, gap: 32,
      }}>
        {/* Logo */}
        <Link href="/">
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, flexShrink: 0,
            }}>🏠</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#f8fafc", lineHeight: 1.2 }}>
                Immobilien Akademie
              </div>
              <div style={{ fontSize: 10, color: "#60a5fa", fontWeight: 600, letterSpacing: "0.05em" }}>
                SMART · IHK-VORBEREITUNG
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 4, marginLeft: 16, flex: 1 }}
             className="hidden-mobile">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <div style={{
                padding: "6px 14px", borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                color: location === link.href ? "#60a5fa" : "#94a3b8",
                background: location === link.href ? "rgba(59,130,246,0.1)" : "transparent",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => {
                  if (location !== link.href)
                    (e.target as HTMLElement).style.color = "#f8fafc";
                }}
                onMouseLeave={e => {
                  if (location !== link.href)
                    (e.target as HTMLElement).style.color = "#94a3b8";
                }}>
                {link.label}
              </div>
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <Link href="/login">
            <button style={{
              background: "transparent", color: "#94a3b8",
              border: "1px solid #334155", borderRadius: 8,
              padding: "8px 16px", fontSize: 13, fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s",
            }}
              onMouseEnter={e => {
                (e.currentTarget.style.color = "#f8fafc");
                (e.currentTarget.style.borderColor = "#64748b");
              }}
              onMouseLeave={e => {
                (e.currentTarget.style.color = "#94a3b8");
                (e.currentTarget.style.borderColor = "#334155");
              }}>
              Anmelden
            </button>
          </Link>
          <Link href="/kurs/modul-1-immobilien-grundkurs">
            <button style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "white", border: "none", borderRadius: 8,
              padding: "8px 16px", fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "opacity 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Kostenlos testen →
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "transparent",
            border: "none", color: "#94a3b8", cursor: "pointer",
            fontSize: 20, padding: 4,
          }}
          className="show-mobile"
          aria-label="Menü öffnen">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "#1e293b", borderTop: "1px solid #334155",
          padding: "12px 20px",
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <div
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "10px 0", fontSize: 14, color: "#cbd5e1",
                  borderBottom: "0.5px solid #334155", cursor: "pointer",
                }}>
                {link.label}
              </div>
            </Link>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Link href="/login">
              <button style={{
                flex: 1, background: "transparent", color: "#94a3b8",
                border: "1px solid #334155", borderRadius: 8,
                padding: "10px", fontSize: 13, cursor: "pointer",
              }}>Anmelden</button>
            </Link>
            <Link href="/kurs/modul-1-immobilien-grundkurs">
              <button style={{
                flex: 1, background: "#2563eb", color: "white",
                border: "none", borderRadius: 8,
                padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer",
              }}>Testen →</button>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
