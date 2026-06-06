# Claims Policy

Stand: 2026-06-06

Diese Policy verhindert, dass rechtlich oder fachlich falsche Aussagen in Kursinhalte, Tests, Generatoren oder Server-Prompts zurueckkehren. Sie ist besonders wichtig fuer Themen rund um Gewerbeerlaubnis, IHK-Sachkunde, Weiterbildungspflichten und Pruefungsversprechen.

## Grundsatz

- Keine erfundene Pruefungspflicht fuer Immobilienmakler nach Paragraph 34c GewO behaupten.
- Keine offiziellen IHK-Pruefungsformate, Bestehensgrenzen oder Musterpruefungen behaupten, wenn sie nicht fuer den konkreten Rechtsbereich belegt sind.
- Paragraph 34c GewO sauber von Paragraph 34i GewO trennen.
- Weiterbildungspflichten fuer Immobilienmakler und Wohnimmobilienverwalter als Weiterbildungspflicht darstellen, nicht als IHK-Sachkundepruefung.
- Jede neue rechtliche Aussage braucht eine belastbare Quelle und ein Pruefdatum.

## Verbotene Formulierungen

Diese oder sinngleiche Aussagen duerfen nicht in produktiven Kursdaten, UI-Texten, Prompts oder Generatorausgaben stehen:

- "Sachkundepruefung nach Paragraph 34c"
- "Sachkundepruefung nach §34c"
- "IHK-Sachkunde Para 34c"
- "IHK-Sachkundepruefung Para 34c"
- "seit 2018 einen IHK-Sachkundenachweis"
- "Missachtung der Sachkundeanforderung" im Kontext Paragraph 34c
- "IHK-Musterpruefungen" fuer Paragraph 34c-Maklerkurse
- "IHK-typische Pruefungsfragen" fuer Paragraph 34c-Maklerkurse
- "Pruefungsformat IHK" fuer Paragraph 34c-Maklerkurse
- "Bestehensgrenze IHK" fuer Paragraph 34c-Maklerkurse

## Erlaubte Formulierungen

Diese Formulierungen sind grundsaetzlich zulässig, solange sie inhaltlich zum Kontext passen:

- "Erlaubnis nach Paragraph 34c GewO"
- "Weiterbildungspflicht nach Paragraph 34c Absatz 2a GewO"
- "Weiterbildung nach Paragraph 15b MaBV"
- "Lernzielkontrolle"
- "Wiederholungsfragen"
- "Praxisfragen"
- "Wissenscheck"
- "Sachkundepruefung nach Paragraph 34i GewO" fuer Immobiliardarlehensvermittlung

## Quellenbasis

- Paragraph 34c GewO: Immobilienmakler, Darlehensvermittler, Bautraeger, Baubetreuer und Wohnimmobilienverwalter; enthaelt Erlaubnis- und Weiterbildungspflichten, aber keine allgemeine IHK-Sachkundepruefung fuer Immobilienmakler.
- Paragraph 15b MaBV: Weiterbildung fuer nach Paragraph 34c Absatz 2a GewO verpflichtete Personen.
- Paragraph 34i GewO: Immobiliardarlehensvermittler; hier ist der Sachkundenachweis Teil der Erlaubnisvoraussetzungen.
- Paragraph 1 ImmVermV: Sachkundepruefung fuer Immobiliardarlehensvermittler nach Paragraph 34i GewO.

Primaerquellen:

- https://www.gesetze-im-internet.de/gewo/__34c.html
- https://www.gesetze-im-internet.de/gewo_34cdv/__15b.html
- https://www.gesetze-im-internet.de/gewo/__34i.html
- https://www.gesetze-im-internet.de/immvermv/__1.html

## Arbeitsregel

Bei jeder Aenderung an Kursdaten, Prompts, Generatoren, Pruefungsfragen oder Landingpage-Claims muss `pnpm test` laufen. Der Test `claims-policy.test.ts` ist absichtlich CI-blockierend.
