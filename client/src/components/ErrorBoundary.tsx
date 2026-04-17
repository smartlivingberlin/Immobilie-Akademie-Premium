import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", background: "#f8fafc", padding: 24,
        }}>
          <div style={{
            background: "white", borderRadius: 16, padding: 40,
            maxWidth: 480, textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>
              Ein Fehler ist aufgetreten
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, marginBottom: 24 }}>
              Bitte laden Sie die Seite neu. Falls das Problem bestehen bleibt,
              kontaktieren Sie uns.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#2563eb", color: "white", border: "none",
                borderRadius: 10, padding: "12px 24px", fontSize: 15,
                fontWeight: 600, cursor: "pointer",
              }}
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
