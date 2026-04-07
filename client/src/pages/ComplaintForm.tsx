import { useState } from "react";
import { Link } from "wouter";

export default function ComplaintForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    // Sende per E-Mail (mailto Fallback)
    const subject = encodeURIComponent("Beschwerde: " + name);
    const body = encodeURIComponent("Von: " + name + "\nE-Mail: " + email + "\n\n" + message);
    window.location.href = "mailto:alisadgadyri38@gmail.com?subject=" + subject + "&body=" + body;
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Beschwerde einreichen</h1>
      <p className="text-slate-500 text-sm mb-8">
        Gemäß §14 ODR-VO und §36 VSBG. Wir nehmen jede Beschwerde ernst und antworten innerhalb von 5 Werktagen.
      </p>
      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-bold text-green-900 mb-2">Beschwerde wird weitergeleitet</h2>
          <p className="text-green-700 text-sm">Ihr E-Mail-Programm öffnet sich. Bitte senden Sie die E-Mail ab.</p>
          <Link href="/">
            <button className="mt-4 text-sm text-green-700 underline">Zurück zur Startseite</button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ihr vollständiger Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-Mail *</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ihre@email.de" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ihre Beschwerde *</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={6}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Beschreiben Sie Ihr Anliegen so detailliert wie möglich..." />
          </div>
          <button onClick={handleSubmit}
            disabled={!name.trim() || !email.trim() || !message.trim()}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-colors">
            Beschwerde absenden
          </button>
          <p className="text-xs text-slate-400 text-center">
            Alternativ: Schreiben Sie direkt an{" "}
            <a href="mailto:alisadgadyri38@gmail.com" className="underline">alisadgadyri38@gmail.com</a>
          </p>
          <div className="bg-slate-50 border rounded-xl p-4 text-xs text-slate-500">
            <strong>Hinweis gem. §36 VSBG:</strong> Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            EU-Streitschlichtung: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer" className="underline">ec.europa.eu/consumers/odr</a>
          </div>
        </div>
      )}
    </div>
  );
}
