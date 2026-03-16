import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import DashboardLayout from "@/components/layout/DashboardLayout";

import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import DeleteAccount from "@/pages/DeleteAccount";
import RedeemCode from "@/pages/RedeemCode";
import AdminCodes from "@/pages/admin/AdminCodes";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import Kurse from "@/pages/Kurse";
import ZahlungErfolgreich from "@/pages/ZahlungErfolgreich";
import Widerruf from "@/pages/Widerruf";
import Bildungskonzept from "@/pages/Bildungskonzept";
import UserManagement from "@/pages/admin/UserManagement";
import Module3Detail from "@/pages/modules/Module3Detail";
import Module4Detail from "@/pages/modules/Module4Detail";
import Module5Detail from "@/pages/modules/Module5Detail";
import Module2Detail from "@/pages/modules/Module2Detail";
import Module1Detail from "@/pages/modules/Module1Detail";
import Module1WithIntro from "@/pages/modules/Module1WithIntro";
import Module2WithIntro from "@/pages/modules/Module2WithIntro";
import Module3WithIntro from "@/pages/modules/Module3WithIntro";
import Module4WithIntro from "@/pages/modules/Module4WithIntro";
import Module5WithIntro from "@/pages/modules/Module5WithIntro";
import ModuleGuard from "@/components/ModuleGuard";
import Syllabus from "@/pages/Syllabus";
import Glossary from "@/pages/Glossary";
import UserGuide from "@/pages/UserGuide";
import Rechner from "@/pages/Rechner";
import Calculators from "@/pages/Calculators";
import Certificates from "@/pages/Certificates";
import ComplaintForm from "@/components/ComplaintForm";
import FeedbackWidget from "@/components/FeedbackWidget";
import Dashboard from "@/pages/Dashboard";
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

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <DashboardLayout>
      <Toaster />
      <CookieConsent />
        <StructuredData />
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
          <Route path="/admin/videos" component={VideoManagement} />
          <Route path="/admin/whitelabel" component={WhiteLabelAdmin} />
          <Route path="/admin/phase" component={PortalPhaseAdmin} />
          
          {/* Legal Pages */}
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/widerruf" component={Widerruf} />
          <Route path="/bildungskonzept" component={Bildungskonzept} />
          <Route path="/kurse" component={Kurse} />
          <Route path="/zahlung-erfolgreich" component={ZahlungErfolgreich} />
          <Route path="/impressum" component={Impressum} />
          <Route path="/agb" component={AGB} />
          

          
          {/* Modul Routes */}
          <Route path="/modul/1" component={Module1WithIntro} />
          <Route path="/modul/1/tag/:day" component={Module1Detail} />
          
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
          <Route path="/impressum" component={Impressum} />
          <Route path="/datenschutz" component={Datenschutz} />
          <Route path="/kurse" component={Kurse} />
          <Route path="/zahlung-erfolgreich" component={ZahlungErfolgreich} />
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
        <Footer />
      </DashboardLayout>
  );
}

function App() {
  // QueryClientProvider ist in main.tsx gesetzt – nicht doppelt wrappen
  return <Router />;
}
export default App;
