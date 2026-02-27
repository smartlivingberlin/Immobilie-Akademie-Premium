import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs() {
  const [location] = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Startseite", href: "/" }];

    // Module paths
    if (paths[0] === "modul") {
      const modulNum = paths[1];
      const modulNames: Record<string, string> = {
        "1": "Modul 1: Einführung",
        "2": "Modul 2: Makler §34c",
        "3": "Modul 3: Verwaltung",
        "4": "Modul 4: Gutachten & Sachverständige",
        "5": "Modul 5: Prüfung & §34i",
      };

      if (modulNum && modulNames[modulNum]) {
        breadcrumbs.push({
          label: modulNames[modulNum],
          href: `/modul/${modulNum}`,
        });

        if (paths[2] === "tag" && paths[3]) {
          breadcrumbs.push({
            label: `Tag ${paths[3]}`,
          });
        }
      }
    }

    // Other pages
    const pageNames: Record<string, string> = {
      lehrplan: "Gesamter Lehrplan",
      glossary: "Glossar & Fachbegriffe",
      rechner: "Praxisrechner",
      lernkarten: "Lernkarten",
      dashboard: "Dashboard",
      certificates: "Zertifikate",
      datenschutz: "Datenschutzerklärung",
      impressum: "Impressum",
      agb: "AGB",
    };

    if (paths[0] && pageNames[paths[0]]) {
      breadcrumbs.push({
        label: pageNames[paths[0]],
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (location === "/") {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-slate-600">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-medium flex items-center gap-1">
                {index === 0 && <Home className="w-4 h-4" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
