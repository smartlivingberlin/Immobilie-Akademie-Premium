import React, { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { trpc } from "@/lib/trpc";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ModuleGuard from "@/components/ModuleGuard";
import { usePageTracking } from "@/hooks/useAnalytics";

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
const KursLanding = lazy(() => import("@/pages/kurs/KursLanding"));

// ── Legal pages ───────────────────────────────────────────────────────────────
const Datenschutz = lazy(() => import("@/pages/legal/Datenschutz"));
const Impressum = lazy(() => import("@/pages/legal/Impressum"));
const AGB = lazy(() => import("@/pages/legal/AGB"));

// ── Shared UI components (lazy — not needed on every route) ──────────────────
const ComplaintForm = lazy(() => import("@/components/ComplaintForm"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));
const CookieBanner = lazy(() => import("@/components/CookieBanner").then(m => ({ default: m.CookieBanner })));
const InspectBanner = lazy(() => import("@/components/InspectBanner").then(m => ({ default: m.InspectBanner })));
const StructuredData = lazy(() => import("@/components/StructuredData").then(m => ({ default: m.StructuredData })));
const AccessibilityPanel = lazy(() => import("@/components/AccessibilityPanel").then(m => ({ default: m.AccessibilityPanel })));
const NotFound = lazy(() => import("@/pages/not-found"));

// ── Protected app pages ───────────────────────────────────────────────────────
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const MeineDaten = lazy(() => import("@/pages/MeineDaten"));
const Certificates = lazy(() => import("@/pages/Certificates"));
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
const OwnerVideos = lazy(() => import("@/pages/OwnerVideos").then(m => ({ default: m.default })));
const OwnerDashboard = lazy(() => import("@/pages/OwnerDashboard").then(m => ({ default: m.default })));

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (!user) { window.location.href = "/login"; return null; }
  return <Component />;
}

function ProtectedModuleRoute({ moduleId, children }: { moduleId: number, children: React.ReactNode }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (!user) { window.location.href = "/login"; return null; }
  return <ModuleGuard moduleId={moduleId}>{children}</ModuleGuard>;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (!user || user.role !== "admin") { window.location.href = "/login"; return null; }
  return <Component />;
}

function OwnerRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  const isInspect = document.cookie.includes("inspect_mode=") || sessionStorage.getItem("inspect_mode") === "1";
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (isInspect) { window.location.href = "/admin"; return null; }
  if (!user || user.role !== "admin") { window.location.href = "/login"; return null; }
  return <Component />;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <Suspense fallback={null}><CookieConsent /></Suspense>
      <Suspense fallback={null}><StructuredData /></Suspense>
      {children}
    </>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <Toaster />
      <Suspense fallback={null}><CookieConsent /></Suspense>
      <Suspense fallback={null}><StructuredData /></Suspense>
      {children}
    </DashboardLayout>
  );
}

function Router() {
  usePageTracking();
  return (
    <main id="main-content"><Suspense fallback={<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:"18px",color:"#64748b"}}>Laden...</div>}>
      <InspectBanner />
      <CookieBanner />
      <ErrorBoundary>
      <Switch>
        <Route path="/"><PublicLayout><Home /></PublicLayout></Route>
        <Route path="/login"><PublicLayout><LoginPage /></PublicLayout></Route>
        <Route path="/forgot-password"><PublicLayout><ForgotPassword /></PublicLayout></Route>
        <Route path="/reset-password"><PublicLayout><ResetPassword /></PublicLayout></Route>
        <Route path="/code-einloesen"><PublicLayout><RedeemCode /></PublicLayout></Route>
        <Route path="/konto/datenschutz"><AppLayout><ProtectedRoute component={MeineDaten} /></AppLayout></Route>
        <Route path="/konto-loeschen"><PublicLayout><DeleteAccount /></PublicLayout></Route>
        <Route path="/dokument-werkstatt/:modulId">{(params: any) => <AppLayout><ProtectedRoute component={() => <DokumentWerkstatt modulId={Number(params?.modulId ?? 1)} />} /></AppLayout>}</Route>
        {/* DEAKTIVIERT: <Route path="/offene-fragen/:modulId">{(params: any) => <AppLayout><OpenQuizPage modulId={Number(params?.modulId ?? 1)} /></AppLayout>}</Route> */}
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
        <Route path="/rechner"><PublicLayout><Rechner /></PublicLayout></Route>
        <Route path="/finanzierungsrechner"><PublicLayout><Calculators /></PublicLayout></Route>
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
        <Route path="/admin-2fa"><Admin2FA /></Route>
        <Route path="/admin"><AppLayout><AdminRoute component={AdminDashboard} /></AppLayout></Route>
        <Route path="/owner-dashboard"><AppLayout><OwnerRoute component={OwnerDashboard} /></AppLayout></Route>
        <Route path="/owner-videos"><AppLayout><OwnerRoute component={OwnerVideos} /></AppLayout></Route>
        <Route path="/rechenpraxis"><AppLayout><Rechenpraxis /></AppLayout></Route>
        <Route path="/tester-zugang"><TesterZugang /></Route>
        <Route path="/partner-panel"><AppLayout><AdminRoute component={PartnerDashboard} /></AppLayout></Route>
        <Route path="/foerderung"><PublicLayout><Foerderung /></PublicLayout></Route>
        <Route path="/audio-modus"><AudioModus /></Route>
        <Route component={NotFound} />
      </Switch>
      </ErrorBoundary>
    </Suspense></main>
  );
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Zum Hauptinhalt springen
      </a>
      <Router />
      <Suspense fallback={null}><AccessibilityPanel /></Suspense>
    </>
  );
}
