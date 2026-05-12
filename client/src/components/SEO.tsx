import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
}

const DEFAULT_SEO = {
  title: "Immobilien-Bildungsportal | Makler §34c, Verwalter WEG/Miet, §34i Ausbildung",
  description: "Komplette Immobilien-Ausbildung: 240 Tage, 810+ Lernaufgaben. Makler §34c GewO, WEG-Verwalter, Mietverwalter, Darlehensvermittler §34i. KI-Tutor, Videos, Quizze, Prüfungsmodus.",
  keywords: "Immobilienmakler Ausbildung, §34c GewO, WEG-Verwalter, Mietverwalter, §34i Darlehensvermittler, IHK Prüfung, Immobilien Weiterbildung, Online Lernportal",
  ogImage: "https://d3p5h1kcpb0w9u.cloudfront.net/hero-makler-1.jpg",
};

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
export function SEO({ title, description, keywords, ogImage, canonical }: SEOProps) {
  const [location] = useLocation();
  
  const fullTitle = title ? `${title} | Immobilien-Bildungsportal` : DEFAULT_SEO.title;
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
    updateMetaTag("author", "Immobilien-Bildungsportal");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "German");
    updateMetaTag("revisit-after", "7 days");

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", metaDescription, true);
    updateMetaTag("og:image", metaImage, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "Immobilien-Bildungsportal", true);
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
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Immobilien-Bildungsportal",
      "description": metaDescription,
      "url": "https://immobilie-akademie-premium-production.up.railway.app",
      "logo": metaImage,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE"
      },
      "offers": {
        "@type": "Offer",
        "category": "Immobilien Ausbildung",
        "priceCurrency": "EUR",
        "price": "0",
        "availability": "https://schema.org/InStock"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [fullTitle, metaDescription, metaKeywords, metaImage, canonicalUrl]);

  return null;
}

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: "Startseite",
    description: "Komplette Immobilien-Ausbildung mit 5 Modulen: Makler §34c, WEG-Verwalter, Mietverwalter, Gutachter, §34i. 240 Tage, KI-Tutor, Videos, Quizze.",
    keywords: "Immobilienmakler, §34c, WEG, Mietverwalter, §34i, IHK, Weiterbildung",
  },
  modul1: {
    title: "Modul 1: Einführung & Grundlagen",
    description: "Grundlagen der Immobilienwirtschaft: Akteure, Märkte, ethische Grundsätze. 20 Tage intensive Ausbildung mit Quizzen und KI-Tutor.",
    keywords: "Immobilienwirtschaft Grundlagen, Immobilienmärkte, Makler Einführung",
  },
  modul2: {
    title: "Modul 2: Maklerrecht & §34c GewO",
    description: "Maklerrecht, §34c GewO, Maklerverordnung, Wettbewerbsrecht. 60 Tage Ausbildung mit Praxisbeispielen, Gerichtsurteilen und IHK-Vorbereitung.",
    keywords: "§34c GewO, Maklerrecht, Maklerverordnung, IHK Makler, Wettbewerbsrecht",
  },
  modul3: {
    title: "Modul 3: Verwaltung (WEG & Miet)",
    description: "WEG-Verwaltung, Mietverwaltung, Hausverwaltung. 80 Tage mit Buchhaltung, Eigentümerversammlungen, DSGVO. Praxisnah mit Fallstudien.",
    keywords: "WEG-Verwalter, Mietverwalter, Hausverwaltung, Eigentümerversammlung, WEG-Recht",
  },
  modul4: {
    title: "Modul 4: Wertermittlung & Gutachten",
    description: "Immobilienbewertung: Sachwert-, Ertragswert-, Vergleichswertverfahren. 20 Tage mit Rechenbeispielen und Gutachten-Erstellung.",
    keywords: "Immobilienbewertung, Sachwertverfahren, Ertragswertverfahren, Verkehrswert, Gutachter",
  },
  modul5: {
    title: "Modul 5: Finanzierung & §34i",
    description: "Immobiliardarlehensvermittlung §34i, Kreditprozesse, Finanzierungsmodelle. 40 Tage IHK-Prüfungsvorbereitung mit Rechenbeispielen.",
    keywords: "§34i, Immobilienfinanzierung, Darlehensvermittler, IHK Prüfung, Kreditvermittlung",
  },
  pruefung: {
    title: "Prüfungsmodus",
    description: "KI-generierte Prüfungsfragen für alle 5 Module. 50 Fragen, 90 Minuten, sofortiges Feedback. Wissenslücken-Analyse und Empfehlungen.",
    keywords: "IHK Prüfung, Prüfungsvorbereitung, Online Test, Makler Prüfung, §34c Prüfung",
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
