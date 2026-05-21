import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  DollarSign,
  Rocket,
  Target,
  BarChart3,
  Lightbulb,
  Award,
  Globe,
  Smartphone,
} from "lucide-react";
import { Link } from "wouter";

export default function StrategiePlattform() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg3djFoLTd6bTAtNWg3djFoLTd6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30 px-6 py-2 text-base">
              <Rocket className="w-5 h-5 mr-2" />
              Expansionsstrategie 2026
            </Badge>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
              Vom Lernportal zum{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                500.000 € Business
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
              Umfassende Strategie für Monetarisierung, Marketing, Skalierung und technische Erweiterung
              des Immobilien Akademie Smart - von 0 auf 10.000 Nutzer in 12 Monaten.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 h-14 text-lg font-semibold"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Strategie entdecken
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 h-14 text-lg"
                onClick={() => document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ROI-Rechner
                <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">14</div>
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Strategiebereiche</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">50-200 €</div>
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Gesamtkosten</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">200-300h</div>
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Implementierung</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">500k €</div>
              <div className="text-sm font-medium text-slate-600 uppercase tracking-wider">Monatspotenzial</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              14 Strategiebereiche für maximalen Erfolg
            </h2>
            <p className="text-xl text-slate-600">
              Von visuellen Features über KI-Integration bis zu Marketing und Monetarisierung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Visuelle & Interaktive Features</CardTitle>
                <CardDescription>Lizenzfreie Bilder, Animationen, Avatare</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unsplash, Pexels, Pixabay (0 €)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hover-Effekte & Micro-Interactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lottie-Animationen (JSON-basiert)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>+60% User-Engagement</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Aufwand:</span>
                    <span className="font-semibold">10-15h</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-green-600">0 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>KI-Tutor wie Synthea</CardTitle>
                <CardDescription>Prüfungsvorbereitung mit Quellenangaben</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Quellenangaben mit Tag-Nummer</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prüfungsmodus mit KI-Bewertung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lernfortschritts-Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>+160% Prüfungsvorbereitung</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Aufwand:</span>
                    <span className="font-semibold">22-28h</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-green-600">0 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>SEO & GEO-Optimierung</CardTitle>
                <CardDescription>Lokale & globale Sichtbarkeit</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google My Business (kostenlos)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lokale Keywords & Backlinks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>IHK & Immobilienverband</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>+200% lokale Sichtbarkeit</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Aufwand:</span>
                    <span className="font-semibold">4-6h</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-green-600">0 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Social Media Marketing</CardTitle>
                <CardDescription>LinkedIn, Instagram, TikTok, YouTube</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Content-Kalender (7 Tage/Woche)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>60-Sekunden-Wissen (Reels)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Webinare & Podcasts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>+300% Reichweite</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Aufwand:</span>
                    <span className="font-semibold">10-15h/Woche</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-green-600">0 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle>Monetarisierung</CardTitle>
                <CardDescription>5 Einnahmequellen</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Freemium: 49,99 €/Monat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>B2B-Lizenzen: 1.000 €/Monat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Affiliate: 5.000-15.000 €/Monat</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Potenzial: 68.500 €/Monat</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Setup:</span>
                    <span className="font-semibold">15-20h</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-green-600">0 €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-pink-600" />
                </div>
                <CardTitle>Mobile & Offline</CardTitle>
                <CardDescription>PWA + Native App</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>PWA bereits implementiert (0 €)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Offline-Funktionalität</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Native App optional (iOS/Android)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>+100% Accessibility</span>
                  </li>
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Aufwand:</span>
                    <span className="font-semibold">80-120h (Native)</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-500">Kosten:</span>
                    <span className="font-semibold text-orange-600">124 $ (Stores)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/strategie-details">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white px-8">
                Alle 14 Bereiche ansehen
                <Target className="ml-2 h-5 w-5" />
              </div>
</Link>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              ROI-Potenzial Rechner
            </h2>
            <p className="text-xl text-slate-600">
              Berechnen Sie Ihr Umsatzpotenzial basierend auf Nutzerzahlen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl">1.000 Nutzer</CardTitle>
                <CardDescription>Phase 2: Launch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Freemium (10%)</span>
                      <span className="font-semibold">5.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">B2B-Lizenzen (2)</span>
                      <span className="font-semibold">2.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Affiliate</span>
                      <span className="font-semibold">500 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Zertifikate (5)</span>
                      <span className="font-semibold">500 €</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-semibold">Gesamt/Monat:</span>
                      <span className="text-2xl font-bold text-blue-600">8.000 €</span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-slate-600">
                      <span>Jahr:</span>
                      <span className="font-semibold">96.000 €</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-1">
                  <Award className="w-4 h-4 mr-1" />
                  Empfohlen
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">5.000 Nutzer</CardTitle>
                <CardDescription>Phase 3: Wachstum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Freemium (15%)</span>
                      <span className="font-semibold">37.500 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">B2B-Lizenzen (10)</span>
                      <span className="font-semibold">10.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Affiliate</span>
                      <span className="font-semibold">10.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Zertifikate (50)</span>
                      <span className="font-semibold">5.000 €</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-semibold">Gesamt/Monat:</span>
                      <span className="text-2xl font-bold text-blue-600">62.500 €</span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-slate-600">
                      <span>Jahr:</span>
                      <span className="font-semibold">750.000 €</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">10.000 Nutzer</CardTitle>
                <CardDescription>Phase 4: Scale-Up</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Freemium (20%)</span>
                      <span className="font-semibold">100.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">B2B-Lizenzen (25)</span>
                      <span className="font-semibold">25.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Affiliate</span>
                      <span className="font-semibold">15.000 €</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Zertifikate (100)</span>
                      <span className="font-semibold">10.000 €</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-semibold">Gesamt/Monat:</span>
                      <span className="text-2xl font-bold text-green-600">150.000 €</span>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-slate-600">
                      <span>Jahr:</span>
                      <span className="font-semibold">1.800.000 €</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Implementierungs-Roadmap
            </h2>
            <p className="text-xl text-slate-600">
              Schritt-für-Schritt-Plan von Quick Wins bis Scale-Up
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Badge className="mb-2 w-fit">0-2 Wochen</Badge>
                <CardTitle>Sofort umsetzen</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Toast-Benachrichtigungen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Lizenzfreie Bilder</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>KI-Quellenangaben</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google My Business</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>LinkedIn-Profil</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2 w-fit bg-green-100 text-green-700">2-4 Wochen</Badge>
                <CardTitle>Kurzfristig</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prüfungsmodus mit KI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hover-Effekte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Instagram/TikTok Start</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Affiliate-Partnerschaften</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Eigene Domain</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2 w-fit bg-orange-100 text-orange-700">1-3 Monate</Badge>
                <CardTitle>Mittelfristig</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Video-Upload</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Podcast-Integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Community-Forum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>B2B-Lizenzen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>YouTube-Kanal</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge className="mb-2 w-fit bg-purple-100 text-purple-700">3-12 Monate</Badge>
                <CardTitle>Langfristig</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Native Mobile App</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Internationale Expansion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>IHK-Zertifizierung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Franchise-Modell</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Investor-Pitch</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bereit, Ihr Portal zum Erfolg zu führen?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Laden Sie die vollständige Strategie-Dokumentation herunter und starten Sie noch heute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/makler-lernportal/STRATEGIE_KOMPLETT.md" download>
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 h-14 text-lg">
                Strategie herunterladen
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link href="/">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 border-white/30 text-white hover:bg-white/10 h-14 text-lg">
                Zum Lernportal
              </div>
</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
