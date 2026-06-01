import { useEffect } from "react";

interface CourseModule {
  name: string;
  description: string;
  numberOfDays: number;
}

const modules: CourseModule[] = [
  {
    name: "Modul 1: Einführung in die Immobilienbranche",
    description: "Grundlagen der Immobilienwirtschaft, Marktüberblick, rechtliche Rahmenbedingungen",
    numberOfDays: 20,
  },
  {
    name: "Modul 2: Immobilienmakler nach §34c GewO",
    description: "Maklerrecht, Vertragsgestaltung, Kundenakquise, Objektvermarktung, Courtage-Berechnung",
    numberOfDays: 60,
  },
  {
    name: "Modul 3: Immobilienverwaltung (WEG & Mietverwaltung)",
    description: "WEG-Verwaltung, Mietverwaltung, Betriebskostenabrechnung, Eigentümerversammlungen",
    numberOfDays: 80,
  },
  {
    name: "Modul 4: Gutachten & Sachverständigenwesen",
    description: "Immobilienbewertung, Wertermittlungsverfahren, Gutachtenerstellung, Sachverständigenrecht",
    numberOfDays: 40,
  },
  {
    name: "Modul 5: Darlehensvermittlung §34i GewO",
    description: "Darlehensvermittlung nach §34i GewO, Finanzierungsberatung, Kreditrecht",
    numberOfDays: 40,
  },
];

/**
 * StructuredData Komponente zur Einbettung von JSON-LD Schemata (Organisation & Kurs).
 * StructuredData component for embedding JSON-LD schemas (Organization & Course).
 *
 * Diese Komponente rendert keine sichtbare UI, sondern fügt Metadaten für Suchmaschinen hinzu.
 * This component does not render visible UI but adds metadata for search engines.
 */
export function StructuredData() {
  useEffect(() => {
    // Educational Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Immobilien Akademie Smart",
      "description": "Praxiswissen §34c Makler, §34i-Sachkunde, WEG-Verwaltung, Immobilienbewertung. KI-gestütztes Lernportal, 240 Lerntage, 5 Berufsbilder.",
      "url": window.location.origin,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Durlacher Str. 36",
        "addressLocality": "Berlin",
        "postalCode": "10715",
        "addressCountry": "DE",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49-171-1526327",
        "email": "info@immobilien-akademie-smart.de",
        "contactType": "customer service",
        "availableLanguage": ["de"],
      },
    };

    // Course Schema
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Immobilien-Komplettausbildung: Makler, Verwalter, Darlehensvermittler",
      "description": "Online-Lernportal für Immobilienprofis mit 240 Lerntagen. Praxiswissen zu §34c GewO, §34i GewO, WEG-Verwaltung und Immobilienbewertung.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Immobilien Akademie Smart",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Durlacher Str. 36",
          "addressLocality": "Berlin",
          "postalCode": "10715",
          "addressCountry": "DE",
        },
      },
      "educationalLevel": "Professional",
      "coursePrerequisites": "Keine formalen Voraussetzungen erforderlich",
      "timeRequired": "P240D",
      "courseMode": "online",
      "inLanguage": "de",
      "availableLanguage": "de",
      "teaches": [
        "Immobilienmakler nach §34c GewO",
        "WEG-Verwaltung",
        "Mietverwaltung",
        "Immobilienbewertung",
        "Darlehensvermittlung nach §34i GewO",
        "Immobilienrecht",
        "Vertragsrecht",
        "Betriebskostenabrechnung",
      ],
      "hasCourseInstance": modules.map((module, index) => ({
        "@type": "CourseInstance",
        "name": module.name,
        "description": module.description,
        "courseMode": "online",
        "duration": `P${module.numberOfDays}D`,
        "position": index + 1,
      })),
    };

    // FAQ Schema (example - can be expanded)
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Was ist §34c GewO?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "§34c GewO regelt die Erlaubnispflicht für Immobilienmakler, Darlehensvermittler, Bauträger und Baubetreuer in Deutschland. Wer gewerbsmäßig diese Tätigkeiten ausüben möchte, benötigt eine behördliche Erlaubnis.",
          },
        },
        {
          "@type": "Question",
          "name": "Wie lange dauert die Ausbildung?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Die Komplettausbildung umfasst 240 Ausbildungstage mit insgesamt 855+ Lernaufgaben. Je nach individuellem Lerntempo kann die Ausbildung in 3-12 Monaten absolviert werden.",
          },
        },
        {
          "@type": "Question",
          "name": "Welche Fach- und Praxisthemen deckt das Portal ab?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Das Portal vermittelt praxisorientiertes Fach- und Rechtswissen zu §34c GewO, §34i GewO, WEG-Verwaltung und Immobilienbewertung. §34i-Inhalte können bei der Vorbereitung auf die IHK-Sachkunde unterstützen. Das Portal ist ein privates Bildungsangebot und ersetzt keine behördliche Erlaubnis oder amtliche Prüfung.",
          },
        },
      ],
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": window.location.origin,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Lehrplan",
          "item": `${window.location.origin}/lehrplan`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Glossar",
          "item": `${window.location.origin}/glossary`,
        },
      ],
    };

    // Insert schemas into head
    const insertSchema = (schema: object, id: string) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    insertSchema(organizationSchema, "schema-organization");
    insertSchema(courseSchema, "schema-course");
    insertSchema(faqSchema, "schema-faq");
    insertSchema(breadcrumbSchema, "schema-breadcrumb");

    // Cleanup on unmount
    return () => {
      ["schema-organization", "schema-course", "schema-faq", "schema-breadcrumb"].forEach((id) => {
        const script = document.getElementById(id);
        if (script) {
          script.remove();
        }
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
