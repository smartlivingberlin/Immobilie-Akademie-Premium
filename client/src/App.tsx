import React, { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { trpc } from "@/lib/trpc";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Home = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const DeleteAccount = lazy(() => import("@/pages/DeleteAccount"));
const RedeemCode = lazy(() => import("@/pages/RedeemCode"));
const AdminCodes = lazy(() => import("@/pages/admin/AdminCodes"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const KursbuchGenerator = lazy(() => import("@/pages/admin/KursbuchGenerator"));
const DozentenCockpit = lazy(() => import("@/pages/admin/DozentenCockpit"));
const MediaSkriptGenerator = lazy(() => import("@/pages/admin/MediaSkriptGenerator"));
const DozentenLoesungen = lazy(() => import("@/pages/admin/DozentenLoesungen"));
const FragenManager = lazy(() => import("@/pages/admin/FragenManager"));
const Fallstudien = lazy(() => import("@/pages/Fallstudien"));
const Flashcards = lazy(() => import("@/pages/Flashcards"));
const ExposeTrainer = lazy(() => import("@/pages/ExposeTrainer"));
const DokumentViewer = lazy(() => import("@/pages/DokumentViewer"));
const ContentUpload = lazy(() => import("@/pages/admin/ContentUpload"));
const Kurse = lazy(() => import("@/pages/Kurse"));
const ZahlungErfolgreich = lazy(() => import("@/pages/ZahlungErfolgreich"));
const Widerruf = lazy(() => import("@/pages/Widerruf"));
const Bildungskonzept = lazy(() => import("@/pages/Bildungskonzept"));
const UserManagement = lazy(() => import("@/pages/admin/UserManagement"));
const Module3Detail = lazy(() => import("@/pages/modules/Module3Detail"));
const Module4Detail = lazy(() => import("@/pages/modules/Module4Detail"));
const Module5Detail = lazy(() => import("@/pages/modules/Module5Detail"));
const Module2Detail = lazy(() => import("@/pages/modules/Module2Detail"));
const Module1Detail = lazy(() => import("@/pages/modules/Module1Detail"));
const Module1WithIntro = lazy(() => import("@/pages/modules/Module1WithIntro"));
const Module2WithIntro = lazy(() => import("@/pages/modules/Module2WithIntro"));
const Module3WithIntro = lazy(() => import("@/pages/modules/Module3WithIntro"));
const Module4WithIntro = lazy(() => import("@/pages/modules/Module4WithIntro"));
const Module5WithIntro = lazy(() => import("@/pages/modules/Module5WithIntro"));
import ModuleGuard from "@/components/ModuleGuard";
const Syllabus = lazy(() => import("@/pages/Syllabus"));
const Glossary = lazy(() => import("@/pages/Glossary"));
const UserGuide = lazy(() => import("@/pages/UserGuide"));
const Rechner = lazy(() => import("@/pages/Rechner"));
const Calculators = lazy(() => import("@/pages/Calculators"));
const Certificates = lazy(() => import("@/pages/Certificates"));
import ComplaintForm from "@/components/ComplaintForm";
import FeedbackWidget from "@/components/FeedbackWidget";
const Dashboard = lazy(() => import("@/pages/Dashboard"));
import QuizPage from "@/pages/QuizPage";
import Quiz from "@/pages/Quiz";
import GamificationDashboard from "@/pages/GamificationDashboard";
import StrategiePlattform from "@/pages/StrategiePlattform";
import VideoManagement from "@/pages/admin/VideoManagement";
import WhiteLabelAdmin from "@/pages/admin/WhiteLabelAdmin";
import PortalPhaseAdmin from "@/pages/admin/PortalPhaseAdmin";

import Datenschutz from "@/pages/legal/Datenschutz";
import Impressum from "@/pages/legal/Impressum";
import AGB from "@/pages/legal/AGB";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import NotFound from "@/pages/not-found";
import ExamMode from "@/pages/ExamMode";
import ExamQuestion from "@/pages/ExamQuestion";
import ExamResults from "@/pages/ExamResults";


function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (!user) { window.location.href = "/login"; return null; }
  return <Component />;
}

function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { data: user, isLoading } = trpc.auth.me.useQuery(undefined, { retry: false });
  if (isLoading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: 14, color: "#64748b" }}>Laden...</div>;
  if (!user || user.role !== "admin") { window.location.href = "/login"; return null; }
  return <Component />;
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <DashboardLayout>
      <Toaster />
      <CookieConsent />
        <StructuredData />
        <Suspense fallback={<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",fontSize:"18px",color:"#64748b"}}>Laden...</div>}>
      <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={Home} />
          
          {/* Global Pages */}
          <Route path="/lehrplan" component={Syllabus} />
          <Route path="/glossary" component={Glossary} />
          <Route path="/rechner" component={Rechner} />
          <Route path="/finanzierungsrechner" component={Calculators} />
          <Route path="/hilfe" component={UserGuide} />
          <Route path="/zertifikate" component={Certificates} />
          <Route path="/beschwerde" component={ComplaintForm} />
          <Route path="/statistiken" component={Dashboard} />
          <Route path="/quiz/:moduleId" component={QuizPage} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/gamification" component={GamificationDashboard} />
          <Route path="/pruefung" component={ExamMode} />
          <Route path="/pruefung/:sessionId" component={ExamQuestion} />
          <Route path="/pruefung/:sessionId/ergebnis" component={ExamResults} />
          <Route path="/strategie" component={StrategiePlattform} />
          
          {/* Admin Pages */}
          <Route path="/admin" component={() => <AdminRoute component={AdminDashboard} />} />
          <Route path="/admin/upload" component={() => <AdminRoute component={ContentUpload} />} />
          <Route path="/admin/kursbuch" component={() => <AdminRoute component={KursbuchGenerator} />} />
          <Route path="/admin/dozenten" component={() => <AdminRoute component={DozentenCockpit} />} />
          <Route path="/admin/mediaskript" component={() => <AdminRoute component={MediaSkriptGenerator} />} />
          <Route path="/admin/loesungen" component={() => <AdminRoute component={DozentenLoesungen} />} />
          <Route path="/admin/fragen" component={() => <AdminRoute component={FragenManager} />} />
          <Route path="/fallstudien" component={Fallstudien} />
          <Route path="/lernkarten" component={Flashcards} />
          <Route path="/expose-trainer" component={ExposeTrainer} />
          <Route path="/dokument-viewer" component={DokumentViewer} />
          <Route path="/admin/videos" component={() => <AdminRoute component={VideoManagement} />} />
          <Route path="/admin/whitelabel" component={() => <AdminRoute component={WhiteLabelAdmin} />} />
          <Route path="/admin/phase" component={() => <AdminRoute component={PortalPhaseAdmin} />} />
          
          {/* Legal Pages */}
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/widerruf" component={Widerruf} />
          <Route path="/bildungskonzept" component={Bildungskonzept} />
          <Route path="/kurse" component={Kurse} />
          <Route path="/zahlung-erfolgreich" component={ZahlungErfolgreich} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/agb" component={AGB} />
          

          
          {/* Modul Routes */}
          <Route path="/modul/1" component={() => <ProtectedRoute component={Module1WithIntro} />} />
          <Route path="/modul/1/tag/:day" component={() => <ProtectedRoute component={Module1Detail} />} />
          
          <Route path="/modul/2">{()=><ModuleGuard moduleId={2}><Module2WithIntro /></ModuleGuard>}</Route>
          <Route path="/modul/2/tag/:day">{()=><ModuleGuard moduleId={2}><Module2Detail /></ModuleGuard>}</Route>
          
          <Route path="/modul/3">{()=><ModuleGuard moduleId={3}><Module3WithIntro /></ModuleGuard>}</Route>
          <Route path="/modul/3/tag/:day">{()=><ModuleGuard moduleId={3}><Module3Detail /></ModuleGuard>}</Route>
          
          <Route path="/modul/4">{()=><ModuleGuard moduleId={4}><Module4WithIntro /></ModuleGuard>}</Route>
          <Route path="/modul/4/tag/:day">{()=><ModuleGuard moduleId={4}><Module4Detail /></ModuleGuard>}</Route>
          
          <Route path="/modul/5">{()=><ModuleGuard moduleId={5}><Module5WithIntro /></ModuleGuard>}</Route>
          <Route path="/modul/5/tag/:day">{()=><ModuleGuard moduleId={5}><Module5Detail /></ModuleGuard>}</Route>
          
          {/* Placeholder Routes for other modules */}
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/konto-loeschen" component={DeleteAccount} />
          <Route path="/code-einloesen" component={RedeemCode} />
          <Route path="/admin/codes" component={AdminCodes} />
          <Route path="/admin/nutzer" component={UserManagement} />
          <Route path="/modul/:id">
            {(params) => (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
                <div className="p-4 bg-slate-100 rounded-full">
                  <span className="text-4xl">🚧</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Modul {params.id} in Entwicklung</h2>
                <p className="text-slate-500 max-w-md">
                  Dieses Modul wird derzeit erstellt. Bitte beginnen Sie mit Modul 3 (Verwaltung), da dieses aktuell im Fokus steht.
                </p>
              </div>
            )}
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      </Suspense>
        <Footer />
      </DashboardLayout>
  );
}

function App() {
  // QueryClientProvider ist in main.tsx gesetzt – nicht doppelt wrappen
  return <Router />;
}
export default App;
