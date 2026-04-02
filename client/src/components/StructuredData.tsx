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
    numberOfDays: 20,
  },
  {
    name: "Modul 5: Prüfungsvorbereitung & Darlehensvermittlung §34i",
    description: "IHK-Prüfungsvorbereitung, Darlehensvermittlung, Finanzierungsberatung, Kreditrecht",
    numberOfDays: 40,
  },
];

export function StructuredData() {
  useEffect(() => {
    // Educational Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Immobilien-Bildungsportal",
      "description": "Komplette Online-Ausbildung zum Immobilienmakler, WEG-Verwalter und Darlehensvermittler nach §34c und §34i GewO",
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
        "email": "gadyri@icloud.com",
        "contactType": "customer service",
        "availableLanguage": ["de"],
      },
    };

    // Course Schema
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Immobilien-Komplettausbildung: Makler, Verwalter, Darlehensvermittler",
      "description": "Umfassende Online-Ausbildung für Immobilienprofis mit 240 Ausbildungstagen und 1920 Unterrichtseinheiten. Bereitet auf IHK-Prüfungen nach §34c und §34i GewO vor.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Immobilien-Bildungsportal",
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
      "timeRequired": "P220D",
      "numberOfCredits": 1920,
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
            "text": "Die Komplettausbildung umfasst 240 Ausbildungstage mit insgesamt 1920 Unterrichtseinheiten. Je nach individuellem Lerntempo kann die Ausbildung in 3-12 Monaten absolviert werden.",
          },
        },
        {
          "@type": "Question",
          "name": "Bereitet das Portal auf die IHK-Prüfung vor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Das Portal bereitet optimal auf die IHK-Sachkundeprüfungen nach §34c und §34i GewO sowie §26a WEG vor. Die Inhalte orientieren sich am IHK-Rahmenplan §34c/§34i GewO. Das Portal selbst ist ein privates Bildungsangebot und ersetzt nicht die offizielle IHK-Prüfung.",
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
