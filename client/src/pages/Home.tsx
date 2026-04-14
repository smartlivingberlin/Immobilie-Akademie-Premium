import { TrialForm } from "@/components/TrialForm";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  BookOpen, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  Building,
  Star,
  Shield,
  Zap,
  Video,
  Brain,
  Award,
  Clock,
  Target,
  TrendingUp,
  Check,
  X,
  ChevronDown,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [openFaq, setOpenFaq] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Immobilien Akademie Smart — IHK-Vorbereitung §34c & §34i"
        description="855+ Prüfungsfragen, KI-Tutor, 240 Lerntage. Die beste Online-Vorbereitung für die IHK-Sachkundeprüfung §34c und §34i GewO."
        keywords="IHK Prüfung, §34c GewO, §34i GewO, Immobilienmakler, WEG-Verwalter, Sachkundeprüfung"
        ogImage="https://immobilie-akademie-production.up.railway.app/icon-512.png"
      />
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 text-blue-300 border-blue-400/30 bg-blue-500/10 px-4 py-1 text-sm">
              <GraduationCap className="w-4 h-4 mr-2" />
              Lehrgang 2026
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Immobilien-Bildungsportal <span className="text-blue-500">Komplettausbildung</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Ihr zentraler Zugang zu allen 5 Ausbildungsmodulen: Vom Einsteiger über den Makler (§34c) und Verwalter (WEG/Miet) bis hin zum Darlehensvermittler (§34i). 
              Insgesamt 1920 Unterrichtseinheiten geballtes Fachwissen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/modul/1">
                <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg w-full sm:w-auto cursor-pointer">
                  Jetzt starten — ab 149 EUR <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </Link>
              <Link href="#pricing">
                <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-600 bg-transparent hover:bg-slate-800 text-slate-200 hover:text-white h-14 px-8 text-lg w-full sm:w-auto cursor-pointer">
                  Preise ansehen
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">5</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Module</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">240</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Ausbildungstage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-1">1920</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Unterrichtseinheiten</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Praxisbezug</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-bold text-slate-900">AZAV-orientiert</div>
                <div className="text-sm text-slate-600">Förderungsfähig</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-800" />
              <div>
                <div className="font-bold text-slate-900">IHK-Vorbereitung</div>
                <div className="text-sm text-slate-600">Offiziell geprüft</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-bold text-slate-900">§34c GewO</div>
                <div className="text-sm text-slate-600">Rechtskonform</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-600" />
              <div>
                <div className="font-bold text-slate-900">DSGVO-konform</div>
                <div className="text-sm text-slate-600">Datenschutz</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Modernste Lernmethoden</h2>
            <p className="text-lg text-slate-600">
              Profitieren Sie von innovativen Features, die Ihren Lernerfolg maximieren
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">KI-Tutor</h3>
                <p className="text-sm text-slate-600">
                  Intelligente Antworten mit Praxisbeispielen, Rechenbeispielen und Gesetzesverweisen
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Video-Tutorials</h3>
                <p className="text-sm text-slate-600">
                  YouTube & Vimeo Integration mit Fortschritts-Tracking für alle 240 Tage
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Interaktive Quizze</h3>
                <p className="text-sm text-slate-600">
                  Sofort-Feedback, Erklärungen und Fortschritts-Tracking für optimale Prüfungsvorbereitung
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Gamification</h3>
                <p className="text-sm text-slate-600">
                  XP-System, Badges und Leaderboards motivieren Sie auf Ihrem Lernweg
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Der modulare Aufbau</h2>
            <p className="text-lg text-slate-600">
              Ein durchdachtes System, das Sie Schritt für Schritt zum Immobilienprofi macht. Starten Sie jederzeit flexibel in jedes Modul.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Modul 1 */}
            <Link href="/modul/1">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-7 h-7 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="mb-4 bg-slate-50 text-slate-600 border-slate-200">Modul 1 • 149 EUR</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Einführung & Grundlagen</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Der perfekte Einstieg. Lernen Sie die Akteure, Märkte und ethischen Grundsätze der Immobilienwirtschaft kennen.
                  </p>
                  <div className="flex items-center text-sm font-medium text-blue-600">
                    Jetzt starten — ab 149 EUR <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Modul 2 */}
            <Link href="/modul/2">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-amber-800" />
                  </div>
                  <Badge variant="outline" className="mb-4 bg-amber-50 text-amber-700 border-amber-200">Modul 2 • Premium</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-800 transition-colors">Maklerrecht & §34c</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Werden Sie zum rechtssicheren Makler. Alles zu GewO, MaBV, Wettbewerbsrecht und Verbraucherschutz.
                  </p>
                  <div className="flex items-center text-sm font-medium text-amber-800">
                    Zum Modul <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Modul 3 */}
            <Link href="/modul/3">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer group ring-2 ring-blue-500/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-7 h-7 text-indigo-600" />
                  </div>
                  <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-0">Modul 3 • Hauptmodul • Premium</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Verwaltung (WEG & Miet)</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Die Königsdisziplin. Meistern Sie WEG-Recht, Mietverwaltung, Technik und kaufmännische Prozesse.
                  </p>
                  <div className="flex items-center text-sm font-medium text-indigo-600">
                    Zum Modul <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Modul 4 */}
            <Link href="/modul/4">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <Badge variant="outline" className="mb-4 bg-emerald-50 text-emerald-700 border-emerald-200">Modul 4 • Premium</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Wertermittlung</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Bewerten Sie Immobilien professionell. Sachwert-, Ertragswert- und Vergleichswertverfahren im Detail.
                  </p>
                  <div className="flex items-center text-sm font-medium text-emerald-600">
                    Zum Modul <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Modul 5 */}
            <Link href="/modul/5">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="mb-4 bg-purple-50 text-purple-700 border-purple-200">Modul 5 • Premium</Badge>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">Finanzierung & §34i</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Der Weg zum Immobiliardarlehensvermittler. Kreditprozesse, Finanzierungsarten und IHK-Prüfungsvorbereitung.
                  </p>
                  <div className="flex items-center text-sm font-medium text-purple-600">
                    Zum Modul <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Was unsere Absolventen sagen</h2>
            <p className="text-lg text-slate-600">
              Lernende aus ganz Deutschland bereiten sich mit uns auf die IHK-Sachkundeprüfung vor
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  "Der KI-Tutor hat mir bei komplexen Rechtsfragen enorm geholfen. Die Praxisbeispiele sind goldwert!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-bold text-blue-600">SK</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Sarah K.</div>
                    <div className="text-sm text-slate-600">Immobilienmaklerin</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  "Modul 3 war intensiv, aber die strukturierte Aufbereitung hat mir die IHK-Prüfung sehr erleichtert."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-bold text-indigo-600">MW</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Michael W.</div>
                    <div className="text-sm text-slate-600">WEG-Verwalter</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">
                  "Die Video-Tutorials und interaktiven Quizze haben meinen Lernerfolg verdoppelt. Absolute Empfehlung!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="font-bold text-purple-600">LB</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Lisa B.</div>
                    <div className="text-sm text-slate-600">Darlehensvermittlerin</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparent & Fair</h2>
            <p className="text-lg text-slate-600">
              Starten Sie mit Modul 1 (149 EUR) oder sichern Sie sich Zugang zur Komplettausbildung
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-slate-200">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">149 EUR</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mb-2">€0</div>
                <CardDescription>Perfekt zum Reinschnuppern</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Modul 1 komplett (20 Tage, 160 UE)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">KI-Tutor mit Basis-Antworten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Interaktive Quizze</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Fortschritts-Tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">Module 2-5</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">Video-Tutorials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400">Zertifikate</span>
                  </li>
                </ul>
                <Link href="/modul/1">
                  <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground w-full h-12 text-lg cursor-pointer">
                    Jetzt starten — ab 149 EUR
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">Beliebteste Wahl</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Premium</CardTitle>
                <div className="text-4xl font-bold text-slate-900 mb-2">€49,99<span className="text-lg font-normal text-slate-600">/Monat</span></div>
                <CardDescription>Komplettausbildung mit allen Features</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">Alle 5 Module (240 Tage, 1920 UE)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">KI-Tutor mit erweiterten Antworten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Video-Tutorials (YouTube/Vimeo)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Interaktive Quizze & Prüfungssimulationen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Zertifikate nach Modul-Abschluss</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Gamification (XP, Badges, Leaderboard)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Priority Support</span>
                  </li>
                </ul>
                <Button className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
                  14 Tage Widerrufsrecht
                </Button>
                <p className="text-xs text-center text-slate-500 mt-3">Jederzeit kündbar • Keine Kreditkarte erforderlich</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Häufig gestellte Fragen</h2>
            <p className="text-lg text-slate-600">
              Alles, was Sie über unsere Ausbildung wissen müssen
            </p>
          </div>

          <Accordion type="single" collapsible value={openFaq} onValueChange={setOpenFaq}>
            <AccordionItem value="item-1" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Was kostet Modul 1?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Modul 1 kostet 149 EUR und enthält alle 20 Lerntage (160 Unterrichtseinheiten) mit Theorie, Gesetzen, Praxisbeispielen, Aufgaben und Quizzen. Nach dem Kauf haben Sie dauerhaften Zugriff.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Wie lange habe ich Zugriff auf die Inhalte?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Bei Premium-Mitgliedschaft haben Sie unbegrenzten Zugriff auf alle Module, solange Ihr Abo aktiv ist. Modul 1 bleibt auch nach Kündigung zugänglich. Ihr Lernfortschritt wird dauerhaft gespeichert.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Sind die Zertifikate IHK-Vorbereitung?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Unsere Ausbildung ist AZAV-orientiert und bereitet Sie optimal auf die IHK-Prüfungen vor. Die Zertifikate nach Modul-Abschluss dokumentieren Ihre Weiterbildung gemäß §34c GewO und werden von Arbeitgebern anerkannt.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Kann ich die Ausbildung neben dem Beruf absolvieren?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Absolut! Unser Portal ist 24/7 verfügbar und Sie lernen in Ihrem eigenen Tempo. Die meisten Teilnehmer absolvieren 2-3 Tage pro Woche und schließen die Komplettausbildung in 6-9 Monaten ab.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Welche Voraussetzungen muss ich mitbringen?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Keine speziellen Vorkenntnisse erforderlich! Modul 1 startet bei den Grundlagen. Empfohlen wird ein mittlerer Bildungsabschluss und Interesse an Immobilien. Für die IHK-Prüfungen gelten separate Zulassungsvoraussetzungen.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Kann ich jederzeit kündigen?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Ja, Premium ist monatlich kündbar ohne Kündigungsfrist. Sie zahlen nur für die Monate, in denen Sie aktiv lernen. Bei Kündigung behalten Sie dauerhaft Zugriff auf Modul 1.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Wie funktioniert der KI-Tutor?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Unser KI-Tutor beantwortet Ihre Fragen mit strukturierten 5-Punkte-Antworten: Kernaussage, Gesetzesgrundlage, Praxisbeispiel, Rechenbeispiel und Merksatz. Die Antworten basieren auf den Portal-Inhalten und sind speziell auf Immobilienrecht optimiert.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-slate-200">
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600">
                Gibt es eine Geld-zurück-Garantie?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                Wir bieten Ihnen das gesetzliche Widerrufsrecht von 14 Tagen nach Kauf (§355 BGB). Die vollständige Widerrufsbelehrung finden Sie unter /widerruf.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Starten Sie jetzt Ihre Immobilien-Karriere</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Starten Sie jetzt Ihre Immobilien-Karriere und bereiten Sie sich gezielt auf die IHK-Sachkundeprüfung vor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modul/1">
              <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-14 px-8 text-lg cursor-pointer">
                Jetzt starten <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white/10">
              Beratung anfragen <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-lg">Immobilien Akademie</span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                Ihr Partner für professionelle Immobilienausbildung. 
                Orientiert an AZAV-Qualitätsstandards · Vorbereitung §34c GewO
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz (DSGVO)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Widerrufsbelehrung</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Kontakt</h4>
              <ul className="space-y-2 text-sm">
                <li>support@immobilien-akademie.de</li>
                <li>+49 (0) 30 123 456 78</li>
                <li>Mo-Fr: 09:00 - 17:00 Uhr</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div>© 2026 Immobilien Akademie GmbH. Alle Rechte vorbehalten.</div>
            <div className="flex gap-4">
              <span>Version 2.5.0 (Stable)</span>
              <span>Server: Frankfurt (EU)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
