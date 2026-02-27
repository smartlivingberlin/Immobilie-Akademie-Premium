import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface WhiteLabelConfig {
  id: number;
  slug: string;
  companyName: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  sidebarColor: string;
  welcomeText: string | null;
  footerText: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  websiteUrl: string | null;
  azavEnabled: boolean;
  azavCertNumber: string | null;
  enabledModules: string;
  maxUsers: number;
  isActive: boolean;
}

interface WhiteLabelContextType {
  config: WhiteLabelConfig | null;
  isLoading: boolean;
  isWhiteLabeled: boolean;
  enabledModules: number[];
  azavEnabled: boolean;
  companyName: string;
  logoUrl: string | null;
  footerText: string | null;
}

const WhiteLabelContext = createContext<WhiteLabelContextType>({
  config: null,
  isLoading: false,
  isWhiteLabeled: false,
  enabledModules: [1, 2, 3, 4, 5],
  azavEnabled: false,
  companyName: "Immobilien Akademie",
  logoUrl: null,
  footerText: null,
});

export function WhiteLabelProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  const { data: tenantConfig, isLoading } = trpc.whitelabel.myTenant.useQuery(undefined, {
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const config = tenantConfig ?? null;
  const isWhiteLabeled = !!config && config.isActive;

  const enabledModules = config
    ? config.enabledModules.split(",").map((m) => parseInt(m.trim())).filter((n) => !isNaN(n))
    : [1, 2, 3, 4, 5];

  // Apply dynamic CSS variables when tenant config changes
  useEffect(() => {
    if (!isWhiteLabeled || !config) {
      // Reset to defaults
      document.documentElement.style.removeProperty("--wl-primary");
      document.documentElement.style.removeProperty("--wl-secondary");
      document.documentElement.style.removeProperty("--wl-accent");
      document.documentElement.style.removeProperty("--wl-sidebar");
      return;
    }

    // Set CSS custom properties for dynamic theming
    document.documentElement.style.setProperty("--wl-primary", config.primaryColor);
    document.documentElement.style.setProperty("--wl-secondary", config.secondaryColor);
    document.documentElement.style.setProperty("--wl-accent", config.accentColor);
    document.documentElement.style.setProperty("--wl-sidebar", config.sidebarColor);

    // Update favicon if provided
    if (config.faviconUrl) {
      const existingFavicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (existingFavicon) {
        existingFavicon.href = config.faviconUrl;
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = config.faviconUrl;
        document.head.appendChild(link);
      }
    }

    // Update page title
    if (config.companyName) {
      document.title = `${config.companyName} - Lernportal`;
    }
  }, [config, isWhiteLabeled]);

  return (
    <WhiteLabelContext.Provider
      value={{
        config,
        isLoading,
        isWhiteLabeled,
        enabledModules,
        azavEnabled: config?.azavEnabled ?? false,
        companyName: config?.companyName ?? "Immobilien Akademie",
        logoUrl: config?.logoUrl ?? null,
        footerText: config?.footerText ?? null,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  );
}

export function useWhiteLabel() {
  return useContext(WhiteLabelContext);
}
