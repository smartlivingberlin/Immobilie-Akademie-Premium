import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';

config();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

console.log('Generiere 80 Fragen für Modul 2...');
const msg = await client.messages.create({
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 8000,
  messages: [{
    role: 'user',
    content: `Generiere 80 IHK-Prüfungsfragen für Immobilienmakler §34c GewO auf Deutsch.
Themen: Maklerrecht, Courtage, Alleinauftrag, Bestellerprinzip, MaBV, GwG, Exposé-Pflichten, Widerrufsrecht, Haftung, DSGVO, Grundbuch, Kaufvertragsrecht, BGB §652-656.
Format: Gib NUR ein JSON-Array zurück, KEIN Text davor oder danach:
[{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","difficulty":"easy","category":"Maklerrecht"}]
Exakt 80 Objekte. Mix: 20 easy, 40 medium, 20 hard.`
  }]
});

const text = msg.content[0].text;
const clean = text.replace(/```json/g,'').replace(/```/g,'').trim();
try {
  const questions = JSON.parse(clean);
  console.log('Generiert:', questions.length, 'Fragen');
  writeFileSync('m2_questions.json', JSON.stringify(questions, null, 2));
  console.log('Gespeichert in m2_questions.json');
} catch(e) {
  console.error('Parse Fehler:', e.message);
  writeFileSync('m2_raw.txt', text);
  console.log('Raw gespeichert in m2_raw.txt');
}
