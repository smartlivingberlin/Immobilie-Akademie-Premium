import { ExternalLink } from "lucide-react";

interface LegalLinkProps {
  law: string;
  className?: string;
}

/**
 * LegalLink Component
 * 
 * Automatically converts law references to real external links:
 * - §34c GewO → gesetze-im-internet.de
 * - WEG § → gesetze-im-internet.de
 * - BGB § → gesetze-im-internet.de
 * - etc.
 */
export function LegalLink({ law, className = "" }: LegalLinkProps) {
  const getLegalUrl = (lawText: string): string | null => {
    const text = lawText.trim();
    
    // §34c GewO
    if (text.includes("§34c") && text.includes("GewO")) {
      return "https://www.gesetze-im-internet.de/gewo/__34c.html";
    }
    
    // §34i GewO
    if (text.includes("§34i") && text.includes("GewO")) {
      return "https://www.gesetze-im-internet.de/gewo/__34i.html";
    }
    
    // WEG (Wohnungseigentumsgesetz)
    if (text.includes("WEG")) {
      const match = text.match(/§\s*(\d+)/);
      if (match) {
        const section = match[1];
        return `https://www.gesetze-im-internet.de/woeigg/__${section}.html`;
      }
      return "https://www.gesetze-im-internet.de/woeigg/";
    }
    
    // BGB (Bürgerliches Gesetzbuch)
    if (text.includes("BGB")) {
      const match = text.match(/§\s*(\d+)/);
      if (match) {
        const section = match[1];
        return `https://www.gesetze-im-internet.de/bgb/__${section}.html`;
      }
      return "https://www.gesetze-im-internet.de/bgb/";
    }
    
    // HGB (Handelsgesetzbuch)
    if (text.includes("HGB")) {
      const match = text.match(/§\s*(\d+)/);
      if (match) {
        const section = match[1];
        return `https://www.gesetze-im-internet.de/hgb/__${section}.html`;
      }
      return "https://www.gesetze-im-internet.de/hgb/";
    }
    
    // ZPO (Zivilprozessordnung)
    if (text.includes("ZPO")) {
      const match = text.match(/§\s*(\d+)/);
      if (match) {
        const section = match[1];
        return `https://www.gesetze-im-internet.de/zpo/__${section}.html`;
      }
      return "https://www.gesetze-im-internet.de/zpo/";
    }
    
    // MaBV (Makler- und Bauträgerverordnung)
    if (text.includes("MaBV")) {
      return "https://www.gesetze-im-internet.de/mabv/";
    }
    
    // BetrKV (Betriebskostenverordnung)
    if (text.includes("BetrKV")) {
      return "https://www.gesetze-im-internet.de/betrkv/";
    }
    
    // HeizkostenV (Heizkostenverordnung)
    if (text.includes("HeizkostenV") || text.includes("HeizkV")) {
      return "https://www.gesetze-im-internet.de/heizkostenv/";
    }
    
    // Generic paragraph search
    const paragraphMatch = text.match(/§\s*(\d+[a-z]?)/);
    if (paragraphMatch) {
      // Default to gesetze-im-internet.de search
      const query = encodeURIComponent(text);
      return `https://www.gesetze-im-internet.de/Teilliste_${query.charAt(0).toUpperCase()}.html`;
    }
    
    return null;
  };

  const url = getLegalUrl(law);

  if (!url) {
    // No link available, just display the text
    return <span className={className}>{law}</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 hover:underline transition-colors ${className}`}
      title={`${law} auf gesetze-im-internet.de öffnen`}
    >
      {law}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

/**
 * Helper function to check if a text contains legal references
 */
export function hasLegalReference(text: string): boolean {
  const patterns = [
    /§\s*\d+[a-z]?/i,
    /WEG/i,
    /BGB/i,
    /HGB/i,
    /GewO/i,
    /ZPO/i,
    /MaBV/i,
    /BetrKV/i,
    /HeizkostenV/i,
    /HeizkV/i,
  ];
  
  return patterns.some(pattern => pattern.test(text));
}
