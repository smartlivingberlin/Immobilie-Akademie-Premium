import { ExternalLink } from "lucide-react";
import { getLawLinkData } from "@/lib/lawLinks";

interface LawLinkProps {
  law: string;
  className?: string;
  showIcon?: boolean;
}

export function LawLink({ law, className = "", showIcon = false }: LawLinkProps) {
  const linkData = getLawLinkData(law);

  if (!linkData) {
    return <span className={className}>{law}</span>;
  }

  return (
    <a
      href={linkData.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-600 hover:underline font-medium inline-flex items-center gap-1 ${className}`}
      title={linkData.title}
    >
      {linkData.text}
      {showIcon && <ExternalLink className="w-3 h-3" />}
    </a>
  );
}
