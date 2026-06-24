import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import AIAssistant from "@/components/AIAssistant";
import { BookOpen, GraduationCap, Home, LayoutDashboard, Settings, LogOut, Menu, X, Search, ChevronLeft, ChevronRight, Gavel, Calculator, FileText, Sparkles, HelpCircle, Building2, Award, BarChart3, Trophy, Video, ClipboardCheck, Brain, KeyRound, Film, BookText, Upload, FlaskConical, FileCheck, Headphones, RotateCcw, Compass, MessageSquareQuote, Kanban, Scale, Users, Inbox, Clock } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import Footer from "@/components/layout/Footer";
import { isVerwalterPortal } from "@/lib/portalMode";
import { useWhiteLabel } from "@/contexts/WhiteLabelContext";
import { useModuleAccess } from "@/hooks/useModuleAccess";
import { useInspectReadOnly } from "@/hooks/useInspectReadOnly";
import { clearInspectModeClientState, isInspectModeSync } from "@/lib/inspectMode";
import { Button } from "@/components/ui/button";
import { ComfortBar } from "@/components/ComfortBar";
import { GlobalSearch } from "@/components/GlobalSearch";
import { GlobalGlossary } from "@/components/GlobalGlossary";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      clearInspectModeClientState();
      sessionStorage.removeItem("ownerKey");
      window.location.href = "/login";
    },
  });
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  const { user } = useAuth();
  const { isReadOnly: isInspectReadOnly } = useInspectReadOnly();
  const verwalterMode = isVerwalterPortal();
  const showAdminNav = !verwalterMode && (user?.role === "admin" || isInspectModeSync());
  const { isWhiteLabeled, companyName, logoUrl, config } = useWhiteLabel();

  const allModules = [
    { id: 1, name: "Modul 1: Grundkurs", href: "/modul/1", icon: BookOpen },
    { id: 2, name: "Modul 2: Makler §34c", href: "/modul/2", icon: Search },
    { id: 3, name: "Modul 3: WEG-Verwalter", href: "/modul/3", icon: BuildingIcon },
    { id: 4, name: "Modul 4: Gutachter", href: "/modul/4", icon: Calculator },
    { id: 5, name: "Modul 5: §34i Darlehensvermittler", href: "/modul/5", icon: GraduationCap },
  ];

  const { canAccessModule } = useModuleAccess();

// Module immer anzeigen, aber ggf. "gesperrt" markieren
const modulesWithAccess = allModules.map((m) => ({
  ...m,
  locked: !canAccessModule(m.id),
}));

const modulId = modulesWithAccess.find(m => !m.locked)?.id ?? 1;

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  locked?: boolean;
}

const navigation: NavigationItem[] = verwalterMode
  ? [
      { name: "Übersicht", href: "/app/verwalter", icon: LayoutDashboard },
      { name: "Objekte", href: "/app/verwalter/objekte", icon: Building2 },
      { name: "Vorgänge", href: "/app/verwalter/vorgaenge", icon: Kanban },
      { name: "Buchungen", href: "/app/verwalter/buchungen", icon: BookOpen },
      { name: "Mahnwesen", href: "/app/verwalter/mahnwesen", icon: Scale },
      { name: "ETV", href: "/app/verwalter/etv", icon: Users },
      { name: "Inbox", href: "/app/verwalter/inbox", icon: Inbox },
      { name: "Freigaben", href: "/app/verwalter/freigaben", icon: ClipboardCheck },
      { name: "Vorlagen", href: "/app/verwalter/vorlagen", icon: FileText },
      { name: "Fristen", href: "/app/verwalter/fristen", icon: Clock },
    ]
  : [
  { name: "Startseite", href: "/", icon: Home },
  ...modulesWithAccess.map((m) => ({ name: m.name, href: m.href, icon: m.icon, locked: m.locked })),
  { name: "📄 Dokument-Werkstatt", href: `/dokument-werkstatt/${modulId}`, icon: FileText },
];

  // Determine sidebar background color (White-Label or default)
  const sidebarBg = isWhiteLabeled && config?.sidebarColor ? config.sidebarColor : undefined;
  const primaryColor = isWhiteLabeled && config?.primaryColor ? config.primaryColor : undefined;

  // Helper component for nav items to handle collapsed state
  const NavItem = ({ item }: { item: NavigationItem }) => {
    const isActive = location === item.href || location.startsWith(item.href + "/");
    const isLocked = Boolean(item.locked);
    const lockMsg = "Dieses Modul ist gesperrt. Bitte freischalten lassen.";

    // Wenn gesperrt: NICHT navigieren, nur Hinweis zeigen
    if (isLocked) {
      if (isCollapsed) {
        return (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div
                  onClick={() => console.warn("Modul gesperrt:", lockMsg)}
                  title={lockMsg}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium w-full justify-center h-10 px-0 mb-1 cursor-not-allowed opacity-60 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                🔒 {item.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return (
        <div
          onClick={() => console.warn("Modul gesperrt:", lockMsg)}
          title={lockMsg}
          className="inline-flex items-center rounded-md text-sm font-medium w-full justify-start mb-1 h-10 px-4 py-2 cursor-not-allowed opacity-60 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <item.icon className="mr-3 h-5 w-5" />
          🔒 {item.name}
        </div>
      );
    }

    // Normal: wie gehabt (klickbar)
    if (isCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                <div
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-center h-10 px-0 mb-1 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
              {item.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Link href={item.href}>
        <div
          className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full justify-start mb-1 h-10 px-4 py-2 cursor-pointer ${
            isActive ? "bg-blue-600 text-white hover:bg-blue-700" : "text-slate-300 hover:text-white hover:bg-slate-800"
          }`}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.name}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-background flex w-full overflow-x-hidden">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        data-app-sidebar
        className={`
          fixed lg:static inset-y-0 left-0 z-50 text-white transition-all duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        `}
        style={{ backgroundColor: sidebarBg || '#0f172a' }}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center h-16 border-b border-slate-800 ${isCollapsed ? "justify-center px-0" : "px-6 justify-between"}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
              ) : (
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: primaryColor || '#2563eb' }}>
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
              )}
              <div>
                {verwalterMode ? (
                  <div className="font-bold text-lg leading-none">Verwalter-Suite</div>
                ) : (
                  <>
                    <div className="font-bold text-lg leading-none">{isWhiteLabeled ? companyName : 'Immobilien'}</div>
                    {!isWhiteLabeled && <span className="text-xs text-blue-400 font-medium">Akademie</span>}
                  </>
                )}
              </div>
            </div>
          )}
          {isCollapsed && (
            logoUrl ? (
              <img src={logoUrl} alt={companyName} width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
            ) : (
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: primaryColor || '#2563eb' }}>
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            )
          )}
          
          {/* Collapse Toggle (Desktop only) */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label={isCollapsed ? "Menü aufklappen" : "Menü einklappen"}
            className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>

          {/* Close Button (Mobile only) */}
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Menü schließen"
            className="lg:hidden text-slate-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Global Search Area */}
        <div className={`p-4 border-b border-slate-800 ${isCollapsed ? "px-2" : ""}`}>
          <GlobalSearch collapsed={isCollapsed} />
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}

            {/* Help & Resources */}
            {!verwalterMode && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              {isCollapsed ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link href="/hilfe">
                        <div className="w-full flex justify-center mb-2">
                          <div className="flex items-center justify-center h-10 w-10 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer">
                            <HelpCircle className="h-5 w-5" />
                          </div>
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                      Benutzerhandbuch
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <div className="px-3 mb-4">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Hilfe & Ressourcen
                  </div>
                  <Link href="/hilfe">
                    <div className="flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer">
                      <HelpCircle className="h-5 w-5 mr-3" />
                      Benutzerhandbuch
                    </div>
                  </Link>
                </div>
              )}
            </div>
            )}

            {/* Admin Section (admins + inspect preview guests) */}
            {showAdminNav && (
              <div className="border-t border-slate-800 pt-4">
                {isCollapsed ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link href="/admin/whitelabel">
                          <div className="w-full flex justify-center mb-2">
                            <div className={`flex items-center justify-center h-10 w-10 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer ${location === '/admin/whitelabel' ? 'bg-blue-600 text-white' : ''}`}>
                              <Building2 className="h-5 w-5" />
                            </div>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                        White-Label Verwaltung
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className="px-3 mb-4">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Administration
                    </div>
                    <Link href="/admin">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                      </div>
                    </Link>
                    <Link href="/admin/loesungen">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/loesungen' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <BookOpen className="h-4 w-4 mr-2" /> Lösungsübersicht
                      </div>
                    </Link>
                    <Link href="/admin/dozenten">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/dozenten' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <GraduationCap className="h-4 w-4 mr-2" /> Dozenten-Cockpit
                      </div>
                    </Link>
                    <Link href="/admin/kursbuch">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/kursbuch' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <BookText className="h-4 w-4 mr-2" /> Kursbuch-Generator
                      </div>
                    </Link>
                    <Link href="/admin/fragen">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/fragen' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <HelpCircle className="h-4 w-4 mr-2" /> Fragen-Manager
                      </div>
                    </Link>
                    <Link href="/admin/portal-agent">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/portal-agent' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <span className="mr-2">🤖</span> Portal-Agent
                      </div>
                    </Link>
                    <Link href="/admin/ki-monitor">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/ki-monitor' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <span className="mr-2">📊</span> KI-Monitor
                      </div>
                    </Link>
                    <Link href="/admin/upload">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/upload' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <Upload className="h-4 w-4 mr-2" /> Content Upload
                      </div>
                    </Link>
                    <Link href="/admin/whitelabel">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/whitelabel' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <Building2 className="h-5 w-5 mr-3" />
                        White-Label
                      </div>
                    </Link>
                    <Link href="/admin/videos">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/videos' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <Video className="h-5 w-5 mr-3" />
                        Videos
                      </div>
                    </Link>
                    <Link href="/admin/codes">
                      <div className={`flex items-center w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 rounded-md px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${location === '/admin/codes' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                        <KeyRound className="h-5 w-5 mr-3" />
                        Zugangscodes
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Glossary Integration */}
            {!verwalterMode && (
            <div className="border-t border-slate-800 pt-4">
              {isCollapsed ? (
                <>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link href="/rechner">
                          <div className="w-full flex justify-center mb-2">
                            <Button variant="ghost" size="icon" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/rechner' ? 'bg-blue-600 text-white' : ''}`} aria-label="Praxisrechner">
                              <Calculator className="h-5 w-5" />
                            </Button>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                        Praxisrechner
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link href="/statistiken">
                          <div className="w-full flex justify-center mb-2">
                            <Button variant="ghost" size="icon" aria-label="Lernstatistiken" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/statistiken' ? 'bg-blue-600 text-white' : ''}`}>
                              <BarChart3 className="h-5 w-5" />
                            </Button>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                        Lernstatistiken
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link href="/zertifikate">
                          <div className="w-full flex justify-center mb-2">
                            <Button variant="ghost" size="icon" aria-label="Zertifikate" className={`text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/zertifikate' ? 'bg-blue-600 text-white' : ''}`}>
                              <Award className="h-5 w-5" />
                            </Button>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                        Zertifikate
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="w-full flex justify-center mb-2">
                    <GlobalGlossary compact />
                  </div>
                </>
              ) : (
                <div className="px-3">
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Wissen & Tools
                  </div>
                  <Link href="/rechner">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/rechner' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Calculator className="h-5 w-5 mr-3" />
                      Praxisrechner
                    </div>
                  </Link>
                  <Link href="/rechenpraxis">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/rechenpraxis' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Calculator className="h-5 w-5 mr-3" />
                      Rechenpraxis
                    </div>
                  </Link>
                  <div className="mb-2">
                    <GlobalGlossary />
                  </div>
                  <Link href="/audio-modus">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/audio-modus' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Headphones className="h-5 w-5 mr-3" />
                      Audio-Modus
                    </div>
                  </Link>
                  <Link href="/finanzierungsrechner">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/finanzierungsrechner' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Calculator className="h-5 w-5 mr-3" />
                      Finanzierungsrechner
                    </div>
                  </Link>
                  <Link href="/quiz">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/quiz' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Brain className="h-5 w-5 mr-3" />
                      Prüfungssimulation
                    </div>
                  </Link>
                  <Link href="/offene-fragen/3">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location.startsWith('/offene-fragen') ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <MessageSquareQuote className="h-5 w-5 mr-3" />
                      Offene Fragen
                    </div>
                  </Link>
                  <Link href="/pruefung">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/pruefung' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <ClipboardCheck className="h-5 w-5 mr-3" />
                      Prüfungsmodus
                    </div>
                  </Link>
                  <Link href="/statistiken">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/statistiken' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <BarChart3 className="h-5 w-5 mr-3" />
                      Lernstatistiken
                    </div>
                  </Link>
                  <Link href="/zertifikate">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/zertifikate' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Award className="h-5 w-5 mr-3" />
                      Zertifikate
                    </div>
                  </Link>
                  <Link href="/weiterbildungsnachweis">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/weiterbildungsnachweis' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <FileCheck className="h-5 w-5 mr-3" />
                      Weiterbildungsnachweis
                    </div>
                  </Link>
                  <Link href="/code-einloesen">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/code-einloesen' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <KeyRound className="h-5 w-5 mr-3" />
                      Code einlösen
                    </div>
                  </Link>
                  <Link href="/gamification">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/gamification' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Trophy className="h-5 w-5 mr-3" />
                      Gamification
                    </div>
                  </Link>
                  <Link href="/strategie">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/strategie' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <Compass className="h-5 w-5 mr-3" />
                      Strategie
                    </div>
                  </Link>
                  <Link href="/lernkarten">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/lernkarten' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <BookOpen className="h-5 w-5 mr-3" />
                      Lernkarten
                    </div>
                  </Link>
                  <Link href="/wiederholung">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/wiederholung' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <RotateCcw className="h-5 w-5 mr-3" />
                      Wiederholung
                    </div>
                  </Link>
                  <Link href="/dokument-viewer">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/dokument-viewer' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <FileText className="h-5 w-5 mr-3" />
                      Dokument-Viewer
                    </div>
                  </Link>
                  <Link href="/expose-trainer">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/expose-trainer' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <FileText className="h-5 w-5 mr-3" />
                      Exposé-Trainer
                    </div>
                  </Link>
                  <Link href="/fallstudien">
                    <div className={`inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full justify-start mb-2 h-10 px-4 py-2 cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 ${location === '/fallstudien' ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}`}>
                      <FileText className="h-5 w-5 mr-3" />
                      Fallstudien
                    </div>
                  </Link>
                </div>
              )}
            </div>
            )}
          </nav>
        </div>

        {/* User Profile / Footer */}
        <div className={`p-4 border-t border-slate-800 bg-slate-900/50 ${isCollapsed ? "px-2 items-center flex flex-col" : ""}`}>
          {!isCollapsed ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Gesamtfortschritt</span>
                  <span>wird berechnet...</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{width: "100%"}} />
                </div>
                <div className="text-[10px] text-slate-300 mt-1 text-center">
                  Lernfortschritt wird geladen
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <span className="font-semibold text-sm">JD</span>
                </div>
                <div className="overflow-hidden">
                  <div className="font-medium text-sm truncate">
                    {isInspectReadOnly ? "Vorschau-Gast" : (user?.name || user?.email?.split("@")[0] || "Nutzer")}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {isInspectReadOnly ? "Admin-Vorschau (read-only)" : (user?.role === "admin" ? "Administrator" : "Teilnehmer")}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 mb-4 cursor-help">
                    <span className="font-semibold text-sm">JD</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">{user?.name || "Nutzer"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!isInspectReadOnly && (
            <Button 
              variant="outline" 
              onClick={() => logoutMutation.mutate()}
              className={`w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white ${isCollapsed ? "px-0" : ""}`}
            >
              <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-2"}`} />
              {!isCollapsed && "Abmelden"}
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 flex flex-col min-w-0 overflow-auto bg-background" tabIndex={-1}>
        {/* Desktop: Komfort-Leiste oben (sichtbar, nicht in der Sidebar unten) */}
        <div className="hidden lg:flex sticky top-0 z-20 h-12 items-center justify-end gap-3 px-6 bg-background/95 border-b border-border backdrop-blur">
          <ComfortBar />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 min-w-0">
            <div className="bg-primary p-1.5 rounded-lg shrink-0">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground truncate">{verwalterMode ? "Verwalter-Suite" : "Immobilien Akademie"}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <ComfortBar compact />
            <Button variant="ghost" size="icon" aria-label="Menü öffnen" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6 text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Content Scroll Area */}
        <div
          id="learning-scroll"
          className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth"
          data-inspect-readonly={isInspectReadOnly ? "" : undefined}
        >
          <div className={`max-w-7xl mx-auto transition-all duration-300 ${isCollapsed ? "max-w-[1600px]" : ""}`}>
            <Breadcrumbs />
            {children}
          </div>
        </div>
      <Footer />
      </main>

      {/* Floating AI Assistant Button */}
      <Button
        onClick={() => setIsAIAssistantOpen(true)}
        aria-label="KI-Assistent öffnen"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-40"
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* AI Tutor Modal */}
      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        moduleContext={location.startsWith("/modul/") ? `Modul ${location.split("/")[2]}` : undefined}
      />
    </div>
  );
}

// Icon wrapper for Module 3 to avoid collision
function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}
