import { useEffect } from "react";
import { useLocation } from "wouter";
import { PUBLIC_QUIZ_QUESTION_COUNT, STRUCTURED_LEARNING_DAYS } from "@shared/claims";

export interface KursSeoData {
  titel: string;
  seo_desc: string;
  preis: number;
}

export interface FaqSeoItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  kurs?: KursSeoData;
  faq?: FaqSeoItem[];
}

const DEFAULT_SEO = {
  title: "Immobilien Akademie Smart | Praxisorientierte Immobilien-Weiterbildung",
  description: `Online-Lernportal für Immobilienberufe: Vorbereitung auf die Sachkundeprüfung §34i, WEG-Verwalter nach §26a WEG sowie Praxiswissen zu §34c GewO, Maklerrecht und Immobilienbewertung. ${PUBLIC_QUIZ_QUESTION_COUNT} Lernfragen, KI-Tutor, ${STRUCTURED_LEARNING_DAYS} Lerntage.`,
  keywords: "Immobilienmakler Weiterbildung, §34c GewO, WEG-Verwalter, Mietverwalter, §34i Darlehensvermittler, Sachkundeprüfung §34i, Immobilien Prüfungsvorbereitung, Online Lernportal",
  ogImage: "/og-image.svg",
};

const ORGANIZATION_PROVIDER = {
  "@type": "Organization",
  "name": "Immobilien Akademie Smart",
  "url": "https://www.immobilien-akademie-smart.de",
} as const;

/**
 * SEO Komponente zur Verwaltung von Meta-Tags und strukturierten Daten.
 * SEO component for managing meta tags and structured data.
 *
 * @param {string} [title] - Der Seitentitel.
 * @param {string} [description] - Die Seitenbeschreibung.
 * @param {string} [keywords] - Schlüsselwörter für die Seite.
 * @param {string} [ogImage] - Bild für Open Graph (Social Sharing).
 * @param {string} [canonical] - Kanonische URL der Seite.
 */
export function SEO({ title, description, keywords, ogImage, canonical, kurs, faq }: SEOProps) {
  const [location] = useLocation();
  
  const fullTitle = title ? `${title} | Immobilien Akademie Smart` : DEFAULT_SEO.title;
  const metaDescription = description || DEFAULT_SEO.description;
  const metaKeywords = keywords || DEFAULT_SEO.keywords;
  const metaImage = ogImage || DEFAULT_SEO.ogImage;
  const canonicalUrl = canonical || `${window.location.origin}${location}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", metaDescription);
    updateMetaTag("keywords", metaKeywords);
    updateMetaTag("author", "Immobilien Akademie Smart");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "German");
    updateMetaTag("revisit-after", "7 days");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", metaDescription, true);
    updateMetaTag("og:image", metaImage, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "Immobilien Akademie Smart", true);
    updateMetaTag("og:locale", "de_DE", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", metaDescription);
    updateMetaTag("twitter:image", metaImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Structured Data (JSON-LD)
    const graph: Record<string, unknown>[] = [
      {
        "@type": "EducationalOrganization",
        "name": "Immobilien Akademie Smart",
        "description": metaDescription,
        "url": "https://immobilien-akademie-smart.de",
        "logo": metaImage,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "DE",
        },
      },
    ];

    if (kurs) {
      graph.push({
        "@type": "Course",
        "name": kurs.titel,
        "description": kurs.seo_desc,
        "provider": ORGANIZATION_PROVIDER,
        "offers": {
          "@type": "Offer",
          "price": kurs.preis,
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "inLanguage": "de",
        },
      });
    }

    if (faq?.length) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      });
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": graph,
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [fullTitle, metaDescription, metaKeywords, metaImage, canonicalUrl, kurs, faq]);

  return null;
}

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Startseite",
    description: "Immobilien-Weiterbildung mit 5 Modulen: Makler §34c, WEG-Verwalter, Mietverwalter, Gutachter, §34i. 240 Tage, KI-Tutor, Videos, Quizze.",
    keywords: "Immobilienmakler, §34c, WEG, Mietverwalter, §34i, Weiterbildung",
  },
  modul1: {
    title: "Modul 1: Einführung & Grundlagen",
    description: "Grundlagen der Immobilienwirtschaft: Akteure, Märkte, ethische Grundsätze. 20 Tage strukturierte Weiterbildung mit Quizzen und KI-Tutor.",
    keywords: "Immobilienwirtschaft Grundlagen, Immobilienmärkte, Makler Einführung",
  },
  modul2: {
    title: "Modul 2: Maklerrecht & §34c GewO",
    description: "Maklerrecht, §34c GewO, Maklerverordnung, Wettbewerbsrecht. 60 Tage Weiterbildung mit Praxisbeispielen, Gerichtsurteilen und Wissenschecks.",
    keywords: "§34c GewO, Maklerrecht, Maklerverordnung, Makler Weiterbildung, Wettbewerbsrecht",
  },
  modul3: {
    title: "Modul 3: Verwaltung (WEG & Miet)",
    description: "WEG-Verwaltung, Mietverwaltung, Hausverwaltung. 80 Tage mit Buchhaltung, Eigentümerversammlungen, DSGVO. Praxisnah mit Fallstudien.",
    keywords: "WEG-Verwalter, Mietverwalter, Hausverwaltung, Eigentümerversammlung, WEG-Recht",
  },
  modul4: {
    title: "Modul 4: Wertermittlung & Gutachten",
    description: "Immobilienbewertung: Sachwert-, Ertragswert-, Vergleichswertverfahren. 40 Tage mit Rechenbeispielen und Gutachten-Erstellung.",
    keywords: "Immobilienbewertung, Sachwertverfahren, Ertragswertverfahren, Verkehrswert, Gutachter",
  },
  modul5: {
    title: "Modul 5: Finanzierung & §34i",
    description: "Immobiliardarlehensvermittlung §34i, Kreditprozesse, Finanzierungsmodelle. 40 Tage IHK-Prüfungsvorbereitung mit Rechenbeispielen.",
    keywords: "§34i, Immobilienfinanzierung, Darlehensvermittler, Sachkundeprüfung §34i, Kreditvermittlung",
  },
  pruefung: {
    title: "Prüfungsmodus",
    description: "KI-generierte Prüfungsfragen für alle 5 Module. 50 Fragen, 90 Minuten, sofortiges Feedback. Wissenslücken-Analyse und Empfehlungen.",
    keywords: "Sachkundeprüfung §34i, WEG-Verwalter Prüfung, Prüfungsvorbereitung Immobilien, Online Test",
  },
  glossary: {
    title: "Fachbegriffe & Gesetze",
    description: "Umfassendes Glossar mit 500+ Fachbegriffen, Gesetzen und Verordnungen. Schnellsuche und Kategorien für alle Immobilien-Themen.",
    keywords: "Immobilien Glossar, Fachbegriffe, Gesetze, BGB, GewO, WEG, MaBV",
  },
  rechner: {
    title: "Praxisrechner",
    description: "Interaktive Rechner für Maklercourtage, Wohnfläche, Mietrendite, Kaufnebenkosten. Sofortige Ergebnisse mit Erklärungen.",
    keywords: "Maklercourtage Rechner, Wohnflächenberechnung, Mietrendite, Kaufnebenkosten",
  },
};
