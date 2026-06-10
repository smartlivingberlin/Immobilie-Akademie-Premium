import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Inbox, Mail, Plus } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VerwalterObjekt } from "@shared/verwalterObjektTypes";
import { INBOX_STATUS_LABELS, type VerwalterInboxMessage } from "@shared/verwalterInboxTypes";

export default function InboxIndex() {
  const [enabled, setEnabled] = useState(false);
  const [messages, setMessages] = useState<VerwalterInboxMessage[]>([]);
  const [objekte, setObjekte] = useState<VerwalterObjekt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [working, setWorking] = useState<string | null>(null);
  const [assignObjekt, setAssignObjekt] = useState<Record<string, string>>({});
  const [showTestForm, setShowTestForm] = useState(false);
  const [testForm, setTestForm] = useState({
    from: "eigentuemer@example.com",
    subject: "Wasserschaden Wohnung 3",
    text: "Guten Tag, in der Wohnung 3 ist ein Wasserschaden aufgetreten.",
  });

  const load = async () => {
    setLoading(true);
    try {
      const [iRes, oRes, fRes] = await Promise.all([
        fetch("/api/verwalter/inbox", { credentials: "include" }),
        fetch("/api/verwalter/objekte", { credentials: "include" }),
        fetch("/api/verwalter/feature-flags", { credentials: "include" }),
      ]);
      const iData = await iRes.json();
      const oData = await oRes.json();
      const fData = await fRes.json();
      setEnabled(Boolean(fData.flags?.inbox));
      if (iData.success) setMessages(iData.messages || []);
      if (oData.success) setObjekte(oData.objekte);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const assign = async (id: string) => {
    const objektId = assignObjekt[id];
    if (!objektId) {
      setError("Bitte Objekt wählen.");
      return;
    }
    setWorking(id);
    setError(null);
    try {
      const res = await fetch(`/api/verwalter/inbox/${id}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objektId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Zuordnung fehlgeschlagen");
      setSuccess("Objekt zugeordnet.");
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setWorking(null);
    }
  };

  const toVorgang = async (id: string) => {
    setWorking(id);
    setError(null);
    try {
      const res = await fetch(`/api/verwalter/inbox/${id}/to-vorgang`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objektId: assignObjekt[id] || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Vorgang fehlgeschlagen");
      setSuccess(`Vorgang ${data.vorgang?.id} angelegt.`);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setWorking(null);
    }
  };

  const ingestTest = async () => {
    setWorking("test");
    setError(null);
    try {
      const res = await fetch("/api/verwalter/inbox/ingest", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ingest fehlgeschlagen");
      setSuccess("Test-E-Mail eingegangen.");
      setShowTestForm(false);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setWorking(null);
    }
  };

  if (!enabled) {
    return (
      <>
        <SEO title="E-Mail-Inbox — Verwalter-Rechner" />
        <div className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="text-2xl font-bold">E-Mail-Inbox</h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Die Inbox ist noch nicht aktiviert. Setzen Sie in Railway{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">VERWALTER_INBOX_ENABLED=1</code>{" "}
            und führen Migration 0045 aus.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Siehe <code>docs/VERWALTER_QA_RUNBOOK.md</code> Abschnitt Inbox für Webhook-Konfiguration.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="E-Mail-Inbox — Verwalter-Rechner" />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-2xl font-bold sm:text-3xl inline-flex items-center gap-2">
          <Inbox className="h-6 w-6" /> E-Mail-Inbox
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Eingehende Mails → Objekt zuordnen → Vorgang + optional E-Mail-Entwurf zur Freigabe.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-sm text-emerald-600">{success}</p>}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="min-h-[40px]" onClick={() => setShowTestForm(!showTestForm)}>
            <Plus className="h-4 w-4 mr-1" /> Test-E-Mail
          </Button>
          <Link href="/app/verwalter/freigaben">
            <a className="inline-flex min-h-[40px] items-center text-sm text-emerald-600 hover:underline gap-1 px-2">
              Freigaben <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Link>
        </div>

        {showTestForm && (
          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="font-semibold text-sm">Test-E-Mail simulieren</h2>
            <div className="mt-3 grid gap-3">
              <div>
                <Label>Von</Label>
                <Input className="mt-1 min-h-[44px]" value={testForm.from} onChange={(e) => setTestForm((f) => ({ ...f, from: e.target.value }))} />
              </div>
              <div>
                <Label>Betreff</Label>
                <Input className="mt-1 min-h-[44px]" value={testForm.subject} onChange={(e) => setTestForm((f) => ({ ...f, subject: e.target.value }))} />
              </div>
              <div>
                <Label>Text</Label>
                <textarea
                  className="mt-1 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={testForm.text}
                  onChange={(e) => setTestForm((f) => ({ ...f, text: e.target.value }))}
                />
              </div>
              <Button className="min-h-[44px] w-fit" disabled={working === "test"} onClick={() => void ingestTest()}>
                Eingang simulieren
              </Button>
            </div>
          </section>
        )}

        <section className="mt-8">
          {loading ? (
            <p className="text-slate-500">Lädt…</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-slate-500">Keine Nachrichten in der Inbox.</p>
          ) : (
            <ul className="space-y-3">
              {messages.map((m) => (
                <li
                  key={m.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-1 text-slate-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{m.subject}</div>
                      <div className="text-sm text-slate-500">
                        {m.fromName ? `${m.fromName} ` : ""}&lt;{m.fromEmail}&gt;
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">
                          {INBOX_STATUS_LABELS[m.status]}
                        </span>
                        {m.vorgangTypVorschlag && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                            Vorschlag: {m.vorgangTypVorschlag}
                          </span>
                        )}
                      </div>
                      {m.bodyText && (
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{m.bodyText}</p>
                      )}
                    </div>
                  </div>
                  {m.status !== "vorgang" && (
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <select
                        className="min-h-[44px] flex-1 rounded-md border border-input bg-background px-3 text-sm"
                        value={assignObjekt[m.id] || m.objektId || ""}
                        onChange={(e) => setAssignObjekt((prev) => ({ ...prev, [m.id]: e.target.value }))}
                      >
                        <option value="">Objekt wählen…</option>
                        {objekte.map((o) => (
                          <option key={o.id} value={o.id}>{o.name}</option>
                        ))}
                      </select>
                      {!m.objektId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="min-h-[44px]"
                          disabled={working === m.id}
                          onClick={() => void assign(m.id)}
                        >
                          Zuordnen
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="min-h-[44px]"
                        disabled={working === m.id}
                        onClick={() => void toVorgang(m.id)}
                      >
                        Als Vorgang
                      </Button>
                    </div>
                  )}
                  {m.vorgangId && (
                    <Link href="/app/verwalter/vorgaenge">
                      <a className="mt-2 inline-block text-sm text-emerald-600 hover:underline">
                        Vorgang angelegt → Kanban
                      </a>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
