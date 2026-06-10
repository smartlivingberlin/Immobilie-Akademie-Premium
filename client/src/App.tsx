import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { trpc } from "@/lib/trpc";
import { Toaster } from "@/components/ui/toaster";
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));
const RechenpraxisProductLayout = lazy(() => import("@/components/layout/RechenpraxisProductLayout"));
const Footer = lazy(() => import("@/components/layout/Footer"));
const PublicHeader = lazy(() => import("@/components/layout/PublicHeader"));
import ModuleGuard from "@/components/ModuleGuard";
import { usePageTracking } from "@/hooks/useAnalytics";
import { useInspectMode } from "@/hooks/useInspectMode";
import { isInspectModeSync } from "@/lib/inspectMode";
import { isPlatformOwnerOpenId } from "@shared/ownerIdentity";

// ── Public pages ─────────────────────────────────────────────────────────────
const Home = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const DeleteAccount = lazy(() => import("@/pages/DeleteAccount"));
const RedeemCode = lazy(() => import("@/pages/RedeemCode"));
const KursPakete = lazy(() => import("@/pages/KursPakete"));
const Kurse = lazy(() => import("@/pages/Kurse"));
const ZahlungErfolgreich = lazy(() => import("@/pages/ZahlungErfolgreich"));
const Widerruf = lazy(() => import("@/pages/Widerruf"));
const Bildungskonzept = lazy(() => import("@/pages/Bildungskonzept"));
const Rechner = lazy(() => import("@/pages/Rechner"));
const Calculators = lazy(() => import("@/pages/Calculators"));
const Syllabus = lazy(() => import("@/pages/Syllabus"));
const Glossary = lazy(() => import("@/pages/Glossary"));
const UserGuide = lazy(() => import("@/pages/UserGuide"));
const Foerderung = lazy(() => import("@/pages/Foerderung"));
const UspLanding = lazy(() => import("@/pages/UspLanding"));
const Barrierefreiheit = lazy(() => import("@/pages/Barrierefreiheit"));
const MaklerbuerosLanding = lazy(() => import("@/pages/MaklerbuerosLanding"));
const FuerVerwaltungsbuerosLanding = lazy(() => import("@/pages/FuerVerwaltungsbuerosLanding"));
const Empfehlungsprogramm = lazy(() => import("@/pages/Empfehlungsprogramm"));
const KursLanding = lazy(() => import("@/pages/kurs/KursLanding"));

// ── Legal pages ───────────────────────────────────────────────────────────────
const Datenschutz = lazy(() => import("@/pages/legal/Datenschutz"));
const Impressum = lazy(() => import("@/pages/legal/Impressum"));
const AGB = lazy(() => import("@/pages/legal/AGB"));

// ── Shared UI components (lazy — not needed on every route) ──────────────────
const ComplaintForm = lazy(() => import("@/components/ComplaintForm"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));
const InspectBanner = lazy(() => import("@/components/InspectBanner").then(m => ({ default: m.InspectBanner })));
const StructuredData = lazy(() => import("@/components/StructuredData").then(m => ({ default: m.StructuredData })));
const AccessibilityPanel = lazy(() => import("@/components/AccessibilityPanel").then(m => ({ default: m.AccessibilityPanel })));
const NotFound = lazy(() => import("@/pages/not-found"));

// ── Protected app pages ───────────────────────────────────────────────────────
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MeineDaten = lazy(() => import("@/pages/MeineDaten"));
const Certificates = lazy(() => import("@/pages/Certificates"));
const Weiterbildungsnachweis = lazy(() => import("@/pages/Weiterbildungsnachweis"));
const ComplianceLanding = lazy(() => import("@/pages/ComplianceLanding"));
const VerwalterRechnerLanding = lazy(() => import("@/pages/VerwalterRechnerLanding"));
const RechenpraxisPricing = lazy(() => import("@/pages/RechenpraxisPricing"));
const VorlagenIndex = lazy(() => import("@/pages/verwalter/VorlagenIndex"));
const VorlageDetail = lazy(() => import("@/pages/verwalter/VorlageDetail"));
const FristenCheckliste = lazy(() => import("@/pages/verwalter/FristenCheckliste"));
const ObjekteIndex = lazy(() => import("@/pages/verwalter/ObjekteIndex"));
const VorgaengeIndex = lazy(() => import("@/pages/verwalter/VorgaengeIndex"));
const BuchungenIndex = lazy(() => import("@/pages/verwalter/BuchungenIndex"));
const MahnwesenIndex = lazy(() => import("@/pages/verwalter/MahnwesenIndex"));
const EtvIndex = lazy(() => import("@/pages/verwalter/EtvIndex"));
const InboxIndex = lazy(() => import("@/pages/verwalter/InboxIndex"));
const FreigabenIndex = lazy(() => import("@/pages/verwalter/FreigabenIndex"));
const VerwalterDashboard = lazy(() => import("@/pages/verwalter/VerwalterDashboard"));
const B2bEinrichtung = lazy(() => import("@/pages/B2bEinrichtung"));
const Fallstudien = lazy(() => import("@/pages/Fallstudien"));
const Flashcards = lazy(() => import("@/pages/Flashcards"));
const SpacedRepetition = lazy(() => import("@/pages/SpacedRepetition"));
const ExposeTrainer = lazy(() => import("@/pages/ExposeTrainer"));
const DokumentViewer = lazy(() => import("@/pages/DokumentViewer"));
const DokumentWerkstatt = lazy(() => import("@/pages/DokumentWerkstatt"));
const OpenQuizPage = lazy(() => import("@/pages/OpenQuizPage"));

// ── Quiz / Exam (heavy — lazy) ────────────────────────────────────────────────
const QuizPage = lazy(() => import("@/pages/QuizPage"));
const Quiz = lazy(() => import("@/pages/Quiz"));
const ExamMode = lazy(() => import("@/pages/ExamMode"));
const ExamQuestion = lazy(() => import("@/pages/ExamQuestion"));
const ExamResults = lazy(() => import("@/pages/ExamResults"));

// ── Gamification / Strategy (heavy — lazy) ───────────────────────────────────
const GamificationDashboard = lazy(() => import("@/pages/GamificationDashboard"));
const StrategiePlattform = lazy(() => import("@/pages/StrategiePlattform"));

// ── Audio / special modes ─────────────────────────────────────────────────────
const AudioModus = lazy(() => import("@/pages/AudioModus"));
const Admin2FA = lazy(() => import("@/pages/Admin2FA"));

// ── Module detail pages (177–442 KB each — lazy) ─────────────────────────────
const Module1Detail = lazy(() => import("@/pages/modules/Module1Detail"));
const Module1WithIntro = lazy(() => import("@/pages/modules/Module1WithIntro"));
const Module2Detail = lazy(() => import("@/pages/modules/Module2Detail"));
const Module2WithIntro = lazy(() => import("@/pages/modules/Module2WithIntro"));
const Module3Detail = lazy(() => import("@/pages/modules/Module3Detail"));
const Module3WithIntro = lazy(() => import("@/pages/modules/Module3WithIntro"));
const Module4Detail = lazy(() => import("@/pages/modules/Module4Detail"));
const Module4WithIntro = lazy(() => import("@/pages/modules/Module4WithIntro"));
const Module5Detail = lazy(() => import("@/pages/modules/Module5Detail"));
const Module5WithIntro = lazy(() => import("@/pages/modules/Module5WithIntro"));

// ── Admin pages (lazy — only for admin users) ────────────────────────────────
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const GlossarAdmin = lazy(() => import("@/pages/admin/GlossarAdmin"));
const AdminCodes = lazy(() => import("@/pages/admin/AdminCodes"));
const LandingPageAdmin = lazy(() => import("@/pages/admin/LandingPageAdmin"));
const PartnerDashboard = lazy(() => import("@/pages/PartnerDashboard"));
const TesterZugang = lazy(() => import("@/pages/TesterZugang"));
const Rechenpraxis = lazy(() => import("@/pages/Rechenpraxis"));
const KursbuchGenerator = lazy(() => import("@/pages/admin/KursbuchGenerator"));
const DozentenCockpit = lazy(() => import("@/pages/admin/DozentenCockpit"));
const DozentenLoesungen = lazy(() => import("@/pages/admin/DozentenLoesungen"));
const FragenManager = lazy(() => import("@/pages/admin/FragenManager"));
const ContentUpload = lazy(() => import("@/pages/admin/ContentUpload"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const VideoManagement = lazy(() => import("@/pages/admin/VideoManagement"));
const WhiteLabelAdmin = lazy(() => import("@/pages/admin/WhiteLabelAdmin"));
const PortalPhaseAdmin = lazy(() => import("@/pages/admin/PortalPhaseAdmin"));
const PortalAgentDashboard = lazy(() => import("@/pages/admin/PortalAgentDashboard"));
const KiMonitor = lazy(() => import("@/pages/admin/KiMonitor"));
const ReferralAdmin = lazy(() => import("@/pages/admin/ReferralAdmin"));
const StripeLiveChecklist = lazy(() => import("@/pages/admin/StripeLiveChecklist"));
const OwnerVideos = lazy(() => import("@/pages/OwnerVideos").then(m => ({ default: m.default })));
const OwnerDashboard = lazy(() => import("@/pages/OwnerDashboard").then(m => ({ default: m.default })));

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { ready: inspectReady, active: isInspect } = useInspectMode();
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false, enabled: inspectReady && !isInspect });
  if (!inspectReady || (isLoading && !isInspect)) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  }
  if (!user && !isInspect) { window.location.href = "/login"; return null; }
  return <Component />;
}

function ProtectedModuleRoute({ moduleId, children }: { moduleId: number, children: React.ReactNode }) {
  const { ready: inspectReady, active: isInspect } = useInspectMode();
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false, enabled: inspectReady && !isInspect });
  if (!inspectReady || (isLoading && !isInspect)) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  }
  if (!user && !isInspect) { window.location.href = "/login"; return null; }
  if (isInspect) return <>{children}</>;
  return <ModuleGuard moduleId={moduleId}>{children}</ModuleGuard>;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { ready: inspectReady, active: isInspect } = useInspectMode();
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    enabled: inspectReady && !isInspect,
  });
  if (!inspectReady || (isLoading && !isInspect)) {
    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  }
  if (isInspect) return <Component />;
  if (!user || user.role !== "admin") { window.location.href = "/login"; return null; }
  return <Component />;
}

function OwnerRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  const [owner2FAOk, setOwner2FAOk] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    let active = true;
    fetch("/api/owner/2fa-status", { credentials: "include" })
      .then((response) => response.ok ? response.json() : { ok: false })
      .then((data) => { if (active) setOwner2FAOk(Boolean(data?.ok)); })
      .catch(() => { if (active) setOwner2FAOk(false); });
    return () => { active = false; };
  }, []);

  React.useEffect(() => {
    if (user?.role === "admin" && owner2FAOk) sessionStorage.removeItem("ownerKey");
  }, [user?.role, owner2FAOk]);

  const isInspect = isInspectModeSync();
  const ownerKey = sessionStorage.getItem("ownerKey") || new URLSearchParams(window.location.search).get("key") || "";
  const submitOwnerAccess = (key: string) => {
    sessionStorage.setItem("ownerKey", key);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/owner/access";
    const keyInput = document.createElement("input");
    keyInput.type = "hidden"; keyInput.name = "key"; keyInput.value = key;
    const redirInput = document.createElement("input");
    redirInput.type = "hidden"; redirInput.name = "redirect"; redirInput.value = window.location.pathname + window.location.search;
    form.appendChild(keyInput); form.appendChild(redirInput);
    document.body.appendChild(form); form.submit();
  };

  if (isLoading || owner2FAOk === null) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (isInspect) { window.location.href = "/login"; return null; }
  if ((!user || user.role !== "admin") && ownerKey) { submitOwnerAccess(ownerKey); return null; }
  if (!user || user.role !== "admin") { window.location.href = "/login"; return null; }
  if (!isPlatformOwnerOpenId(user.openId)) { window.location.href = "/login"; return null; }
  if (!owner2FAOk) {
    if (ownerKey) submitOwnerAccess(ownerKey);
    else window.location.href = "/login";
    return null;
  }
  return <Component />;
}

const layoutFallback = (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>
    Laden...
  </div>
);

/** Minimales Shell für Login/Auth — kein Header, Footer, StructuredData. */
function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Suspense fallback={null}><CookieConsent /></Suspense>
      {children}
    </>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Suspense fallback={null}><CookieConsent /></Suspense>
      <Suspense fallback={null}><StructuredData /></Suspense>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Suspense fallback={null}><PublicHeader /></Suspense>
        <div style={{ flex: "1 0 auto" }}>{children}</div>
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={layoutFallback}>
      <DashboardLayout>
        <Toaster />
        <Suspense fallback={null}><CookieConsent /></Suspense>
        <Suspense fallback={null}><StructuredData /></Suspense>
        {children}
      </DashboardLayout>
    </Suspense>
  );
}

/** Eigenes Shell für Verwalter-Rechner / Rechenpraxis (kein Akademie-Modul-Menü). */
function VerwalterProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={layoutFallback}>
      <RechenpraxisProductLayout>
        <Toaster />
        <Suspense fallback={null}><CookieConsent /></Suspense>
        {children}
      </RechenpraxisProductLayout>
    </Suspense>
  );
}

/** Legacy-URL /app/rechenpraxis → kanonisch /rechenpraxis (Query-String bleibt erhalten). */
function RechenpraxisRedirect() {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const qs = window.location.search;
    setLocation(`/rechenpraxis${qs}`, { replace: true });
  }, [setLocation]);
  return null;
}

function Router() {
  usePageTracking();
  return (
    <main id="main-content"><Suspense fallback={<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:"18px",color:"#64748b"}}>Laden...</div>}>
      <InspectBanner />
      <ErrorBoundary>
      <Switch>
        <Route path="/"><PublicLayout><Home /></PublicLayout></Route>
        <Route path="/login"><AuthLayout><LoginPage /></AuthLayout></Route>
        <Route path="/forgot-password"><AuthLayout><ForgotPassword /></AuthLayout></Route>
        <Route path="/reset-password"><AuthLayout><ResetPassword /></AuthLayout></Route>
        <Route path="/code-einloesen"><PublicLayout><RedeemCode /></PublicLayout></Route>
        <Route path="/konto/datenschutz"><AppLayout><ProtectedRoute component={MeineDaten} /></AppLayout></Route>
        <Route path="/konto-loeschen"><PublicLayout><DeleteAccount /></PublicLayout></Route>
        <Route path="/dokument-werkstatt/:modulId">{(params: any) => <AppLayout><ProtectedRoute component={() => <DokumentWerkstatt modulId={Number(params?.modulId ?? 1)} />} /></AppLayout>}</Route>
        <Route path="/offene-fragen/:modulId">{(params: any) => <AppLayout><ProtectedRoute component={() => <OpenQuizPage modulId={Number(params?.modulId ?? 1)} />} /></AppLayout>}</Route>
        <Route path="/pakete"><PublicLayout><KursPakete /></PublicLayout></Route>
        <Route path="/kurse"><PublicLayout><Kurse /></PublicLayout></Route>
        <Route path="/kurs/modul-1-immobilien-grundkurs"><PublicLayout><KursLanding slug="modul-1-immobilien-grundkurs" /></PublicLayout></Route>
        <Route path="/kurs/modul-2-makler-34c"><PublicLayout><KursLanding slug="modul-2-makler-34c" /></PublicLayout></Route>
        <Route path="/kurs/modul-3-weg-verwalter"><PublicLayout><KursLanding slug="modul-3-weg-verwalter" /></PublicLayout></Route>
        <Route path="/kurs/modul-4-gutachter"><PublicLayout><KursLanding slug="modul-4-gutachter" /></PublicLayout></Route>
        <Route path="/kurs/modul-5-34i-darlehensvermittler"><PublicLayout><KursLanding slug="modul-5-34i-darlehensvermittler" /></PublicLayout></Route>
        <Route path="/zahlung-erfolgreich"><PublicLayout><ZahlungErfolgreich /></PublicLayout></Route>
        <Route path="/impressum"><PublicLayout><Impressum /></PublicLayout></Route>
        <Route path="/datenschutz"><PublicLayout><Datenschutz /></PublicLayout></Route>
        <Route path="/agb"><PublicLayout><AGB /></PublicLayout></Route>
        <Route path="/widerruf"><PublicLayout><Widerruf /></PublicLayout></Route>
        <Route path="/bildungskonzept"><PublicLayout><Bildungskonzept /></PublicLayout></Route>
        <Route path="/rechner"><VerwalterProductLayout><ProtectedRoute component={Rechner} /></VerwalterProductLayout></Route>
        <Route path="/finanzierungsrechner"><AppLayout><ProtectedRoute component={Calculators} /></AppLayout></Route>
        <Route path="/lehrplan"><PublicLayout><Syllabus /></PublicLayout></Route>
        <Route path="/glossary"><PublicLayout><Glossary /></PublicLayout></Route>
        <Route path="/hilfe"><PublicLayout><UserGuide /></PublicLayout></Route>
        <Route path="/beschwerde"><PublicLayout><ComplaintForm /></PublicLayout></Route>
        <Route path="/statistiken"><AppLayout><ProtectedRoute component={Dashboard} /></AppLayout></Route>
        <Route path="/quiz/:moduleId"><AppLayout><ProtectedRoute component={QuizPage} /></AppLayout></Route>
        <Route path="/quiz"><AppLayout><ProtectedRoute component={Quiz} /></AppLayout></Route>
        <Route path="/gamification"><AppLayout><ProtectedRoute component={GamificationDashboard} /></AppLayout></Route>
        <Route path="/pruefung/:sessionId/ergebnis"><AppLayout><ProtectedRoute component={ExamResults} /></AppLayout></Route>
        <Route path="/pruefung/:sessionId"><AppLayout><ProtectedRoute component={ExamQuestion} /></AppLayout></Route>
        <Route path="/pruefung"><AppLayout><ProtectedRoute component={ExamMode} /></AppLayout></Route>
        <Route path="/strategie"><AppLayout><ProtectedRoute component={StrategiePlattform} /></AppLayout></Route>
        <Route path="/zertifikate"><AppLayout><ProtectedRoute component={Certificates} /></AppLayout></Route>
        <Route path="/weiterbildungsnachweis"><AppLayout><ProtectedRoute component={Weiterbildungsnachweis} /></AppLayout></Route>
        <Route path="/fallstudien"><AppLayout><ProtectedRoute component={Fallstudien} /></AppLayout></Route>
        <Route path="/wiederholung"><AppLayout><ProtectedRoute component={SpacedRepetition} /></AppLayout></Route>
        <Route path="/lernkarten"><AppLayout><ProtectedRoute component={Flashcards} /></AppLayout></Route>
        <Route path="/expose-trainer"><AppLayout><ProtectedRoute component={ExposeTrainer} /></AppLayout></Route>
        <Route path="/dokument-viewer"><AppLayout><ProtectedRoute component={DokumentViewer} /></AppLayout></Route>
        <Route path="/modul/1/tag/:day"><AppLayout><ProtectedModuleRoute moduleId={1}><Module1Detail /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/1"><AppLayout><ProtectedModuleRoute moduleId={1}><Module1WithIntro /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/2/tag/:day"><AppLayout><ProtectedModuleRoute moduleId={2}><Module2Detail /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/2"><AppLayout><ProtectedModuleRoute moduleId={2}><Module2WithIntro /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/3/tag/:day"><AppLayout><ProtectedModuleRoute moduleId={3}><Module3Detail /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/3"><AppLayout><ProtectedModuleRoute moduleId={3}><Module3WithIntro /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/4/tag/:day"><AppLayout><ProtectedModuleRoute moduleId={4}><Module4Detail /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/4"><AppLayout><ProtectedModuleRoute moduleId={4}><Module4WithIntro /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/5/tag/:day"><AppLayout><ProtectedModuleRoute moduleId={5}><Module5Detail /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/modul/5"><AppLayout><ProtectedModuleRoute moduleId={5}><Module5WithIntro /></ProtectedModuleRoute></AppLayout></Route>
        <Route path="/admin/upload"><AppLayout><AdminRoute component={ContentUpload} /></AppLayout></Route>
        <Route path="/admin/kursbuch"><AppLayout><AdminRoute component={KursbuchGenerator} /></AppLayout></Route>
        <Route path="/admin/dozenten"><AppLayout><AdminRoute component={DozentenCockpit} /></AppLayout></Route>
        <Route path="/admin/loesungen"><AppLayout><AdminRoute component={DozentenLoesungen} /></AppLayout></Route>
        <Route path="/admin/fragen"><AppLayout><AdminRoute component={FragenManager} /></AppLayout></Route>
        <Route path="/admin/videos"><AppLayout><AdminRoute component={VideoManagement} /></AppLayout></Route>
        <Route path="/admin/whitelabel"><AppLayout><AdminRoute component={WhiteLabelAdmin} /></AppLayout></Route>
        <Route path="/admin/phase"><AppLayout><AdminRoute component={PortalPhaseAdmin} /></AppLayout></Route>
        <Route path="/admin/portal-agent"><AppLayout><AdminRoute component={PortalAgentDashboard} /></AppLayout></Route>
        <Route path="/admin/glossar"><AppLayout><AdminRoute component={GlossarAdmin} /></AppLayout></Route>
        <Route path="/admin/ki-monitor"><AppLayout><AdminRoute component={KiMonitor} /></AppLayout></Route>
        <Route path="/admin/codes"><AppLayout><AdminRoute component={AdminCodes} /></AppLayout></Route>
        <Route path="/admin/landing-pages"><AppLayout><AdminRoute component={LandingPageAdmin} /></AppLayout></Route>
        <Route path="/admin/nutzer"><AppLayout><AdminRoute component={UserManagement} /></AppLayout></Route>
        <Route path="/admin/referral"><AppLayout><AdminRoute component={ReferralAdmin} /></AppLayout></Route>
        <Route path="/admin/stripe-live"><AppLayout><AdminRoute component={StripeLiveChecklist} /></AppLayout></Route>
        <Route path="/admin-2fa"><Admin2FA /></Route>
        <Route path="/admin"><AppLayout><AdminRoute component={AdminDashboard} /></AppLayout></Route>
        <Route path="/owner-dashboard"><AppLayout><OwnerRoute component={OwnerDashboard} /></AppLayout></Route>
        <Route path="/owner-videos"><AppLayout><OwnerRoute component={OwnerVideos} /></AppLayout></Route>
        <Route path="/app/rechenpraxis"><RechenpraxisRedirect /></Route>
        <Route path="/app/verwalter">
          <VerwalterProductLayout>
            <ProtectedRoute component={VerwalterDashboard} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/rechenpraxis"><VerwalterProductLayout><ProtectedRoute component={Rechenpraxis} /></VerwalterProductLayout></Route>
        <Route path="/tester-zugang"><TesterZugang /></Route>
        <Route path="/partner-panel"><AppLayout><AdminRoute component={PartnerDashboard} /></AppLayout></Route>
        <Route path="/foerderung"><PublicLayout><Foerderung /></PublicLayout></Route>
        <Route path="/warum-wir"><PublicLayout><UspLanding /></PublicLayout></Route>
        <Route path="/usp"><PublicLayout><UspLanding /></PublicLayout></Route>
        <Route path="/barrierefreiheit"><PublicLayout><Barrierefreiheit /></PublicLayout></Route>
        <Route path="/fuer-maklerbueros"><PublicLayout><MaklerbuerosLanding /></PublicLayout></Route>
        <Route path="/fuer-verwaltungsbueros"><PublicLayout><FuerVerwaltungsbuerosLanding /></PublicLayout></Route>
        <Route path="/b2b-einrichtung"><B2bEinrichtung /></Route>
        <Route path="/empfehlungsprogramm"><PublicLayout><Empfehlungsprogramm /></PublicLayout></Route>
        <Route path="/compliance-20h"><PublicLayout><ComplianceLanding /></PublicLayout></Route>
        <Route path="/verwalter-rechner"><PublicLayout><VerwalterRechnerLanding /></PublicLayout></Route>
        <Route path="/rechenpraxis-preise"><VerwalterProductLayout><RechenpraxisPricing /></VerwalterProductLayout></Route>
        <Route path="/app/verwalter/vorlagen/:slug">
          <VerwalterProductLayout>
            <ProtectedRoute component={VorlageDetail} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/vorlagen">
          <VerwalterProductLayout>
            <ProtectedRoute component={VorlagenIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/fristen">
          <VerwalterProductLayout>
            <ProtectedRoute component={FristenCheckliste} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/objekte">
          <VerwalterProductLayout>
            <ProtectedRoute component={ObjekteIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/vorgaenge">
          <VerwalterProductLayout>
            <ProtectedRoute component={VorgaengeIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/buchungen">
          <VerwalterProductLayout>
            <ProtectedRoute component={BuchungenIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/mahnwesen">
          <VerwalterProductLayout>
            <ProtectedRoute component={MahnwesenIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/etv">
          <VerwalterProductLayout>
            <ProtectedRoute component={EtvIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/inbox">
          <VerwalterProductLayout>
            <ProtectedRoute component={InboxIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/app/verwalter/freigaben">
          <VerwalterProductLayout>
            <ProtectedRoute component={FreigabenIndex} />
          </VerwalterProductLayout>
        </Route>
        <Route path="/audio-modus"><AppLayout><ProtectedRoute component={AudioModus} /></AppLayout></Route>
        <Route component={NotFound} />
      </Switch>
      </ErrorBoundary>
    </Suspense></main>
  );
}

export default function App() {
  const [location] = useLocation();
  const isAuthRoute = ["/login", "/forgot-password", "/reset-password"].includes(location);

  React.useEffect(() => {
    const path = window.location.pathname;
    const timer = setTimeout(() => {
      if (path === "/" || path === "") void import("@/pages/Home");
      if (path === "/login") void import("@/pages/LoginPage");
      if (path.startsWith("/statistiken") || path.startsWith("/modul/")) void import("@/pages/Dashboard");
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <Router />
      {!isAuthRoute && (
        <Suspense fallback={null}><AccessibilityPanel hideFab /></Suspense>
      )}
    </>
  );
}
