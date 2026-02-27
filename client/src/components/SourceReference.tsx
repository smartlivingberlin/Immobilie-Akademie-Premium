import { ExternalLink, BookOpen } from "lucide-react";

interface SourceReferenceProps {
  source: string;
  url?: string;
  type?: "law" | "book" | "article" | "website" | "court";
  date?: string;
  className?: string;
}

export function SourceReference({
  source,
  url,
  type = "website",
  date,
  className = "",
}: SourceReferenceProps) {
  const getIcon = () => {
    switch (type) {
      case "law":
        return "⚖️";
      case "book":
        return "📚";
      case "article":
        return "📄";
      case "court":
        return "🏛️";
      default:
        return "🔗";
    }
  };

  const content = (
    <span className="inline-flex items-center gap-1">
      <span className="text-sm">{getIcon()}</span>
      <span className="text-sm">{source}</span>
      {date && <span className="text-xs text-slate-500">({date})</span>}
      {url && <ExternalLink className="w-3 h-3 ml-1" />}
    </span>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-600 hover:underline ${className}`}
        title={`Quelle: ${source}`}
      >
        {content}
      </a>
    );
  }

  return <span className={`text-slate-600 ${className}`}>{content}</span>;
}

/**
 * Footnote-style source reference
 */
interface FootnoteProps {
  number: number;
  source: string;
  url?: string;
  type?: "law" | "book" | "article" | "website" | "court";
}

export function Footnote({ number, source, url, type }: FootnoteProps) {
  return (
    <div className="text-xs text-slate-600 border-l-2 border-blue-200 pl-3 py-1 my-2">
      <sup className="font-bold text-blue-600">[{number}]</sup>{" "}
      <SourceReference source={source} url={url} type={type} />
    </div>
  );
}

/**
 * Inline citation (superscript number)
 */
interface CitationProps {
  number: number;
  className?: string;
}

export function Citation({ number, className = "" }: CitationProps) {
  return (
    <sup className={`text-blue-600 font-bold cursor-help ${className}`}>
      [{number}]
    </sup>
  );
}

/**
 * Sources section at the end of content
 */
interface SourcesSectionProps {
  sources: Array<{
    source: string;
    url?: string;
    type?: "law" | "book" | "article" | "website" | "court";
    date?: string;
  }>;
}

export function SourcesSection({ sources }: SourcesSectionProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Quellen und Literatur
      </h3>
      <ol className="space-y-2">
        {sources.map((source, index) => (
          <li key={index} className="text-sm">
            <span className="font-bold text-blue-600">[{index + 1}]</span>{" "}
            <SourceReference {...source} />
          </li>
        ))}
      </ol>
    </div>
  );
}
