import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Award, 
  Calendar,
  Flame,
  Target,
  BarChart3,
  Download,
  CheckCircle2
} from "lucide-react";
import { getProgress } from "@/lib/progressTracking";
import { Link } from "wouter";

export default function Dashboard() {
  const [progress, setProgress] = useState(getProgress());

  // Refresh progress data when component mounts
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const modules = [
    { id: 1, name: "Modul 1: Einführung", days: 20, color: "bg-blue-500", lightColor: "bg-blue-100", textColor: "text-blue-700" },
    { id: 2, name: "Modul 2: Makler §34c", days: 60, color: "bg-purple-500", lightColor: "bg-purple-100", textColor: "text-purple-700" },
    { id: 3, name: "Modul 3: Verwaltung", days: 80, color: "bg-emerald-500", lightColor: "bg-emerald-100", textColor: "text-emerald-700" },
    { id: 4, name: "Modul 4: Gutachten", days: 20, color: "bg-orange-500", lightColor: "bg-orange-100", textColor: "text-orange-700" },
    { id: 5, name: "Modul 5: §34i", days: 40, color: "bg-pink-500", lightColor: "bg-pink-100", textColor: "text-pink-700" },
  ];

  const getModuleStats = (moduleId: number) => {
    const module = progress.modules[moduleId];
    if (!module) {
      return {
        completionPercentage: 0,
        daysCompleted: 0,
        totalDays: modules.find(m => m.id === moduleId)?.days || 0,
        timeSpent: 0,
        started: false,
      };
    }

    const totalDays = modules.find(m => m.id === moduleId)?.days || 0;
    const daysCompleted = Object.values(module.days).filter(d => d.completed).length;

    return {
      completionPercentage: module.completionPercentage,
      daysCompleted,
      totalDays,
      timeSpent: Math.round(module.totalTimeSpent / 60), // Convert to hours
      started: true,
    };
  };

  const totalHours = Math.round(progress.totalTimeSpent / 60);
  const activeModules = Object.keys(progress.modules).length;
  const completedModules = Object.values(progress.modules).filter(m => m.completionPercentage >= 80).length;

  // Calculate total days completed
  const totalDaysCompleted = Object.values(progress.modules).reduce((sum, module) => {
    return sum + Object.values(module.days).filter(d => d.completed).length;
  }, 0);

  const totalDays = 220; // Total days across all modules

  // Format last activity date
  const lastActivityText = progress.lastActivityDate
    ? new Date(progress.lastActivityDate).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Keine Aktivität";

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-slate-900">Lernstatistiken</h1>
        </div>
        <p className="text-slate-600">
          Verfolgen Sie Ihren Lernfortschritt und Ihre Erfolge im Detail.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Gesamtfortschritt</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {progress.overallCompletionPercentage}%
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {totalDaysCompleted} von {totalDays} Tagen
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Lernzeit gesamt</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{totalHours}h</p>
                <p className="text-xs text-slate-500 mt-1">
                  ≈ {Math.round(totalHours / 8)} Arbeitstage
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Lernstreak</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{progress.currentStreak}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Rekord: {progress.longestStreak} Tage
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Module abgeschlossen</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {completedModules}/{activeModules}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {activeModules} Module gestartet
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitätsübersicht</CardTitle>
          <CardDescription>Ihre Lernaktivität im Überblick</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Letzte Aktivität</p>
                <p className="font-semibold text-slate-900">{lastActivityText}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Durchschn. Lernzeit/Tag</p>
                <p className="font-semibold text-slate-900">
                  {progress.currentStreak > 0 
                    ? `${Math.round(totalHours / progress.currentStreak)}h`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Verbleibende Tage</p>
                <p className="font-semibold text-slate-900">
                  {totalDays - totalDaysCompleted}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Modulfortschritt</h2>
          <Link href="/zertifikate">
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-3">
              <Award className="w-4 h-4 mr-2" />
              Zertifikate anzeigen
            </div>
</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modules.map((module) => {
            const stats = getModuleStats(module.id);
            
            return (
              <Card key={module.id} className="relative overflow-hidden">
                {/* Color accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-2 ${module.color}`} />
                
                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {stats.daysCompleted} von {stats.totalDays} Tagen abgeschlossen
                      </CardDescription>
                    </div>
                    {stats.started ? (
                      <Badge className={module.lightColor + " " + module.textColor + " hover:" + module.lightColor}>
                        Aktiv
                      </Badge>
                    ) : (
                      <Badge variant="outline">Nicht gestartet</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Circular Progress Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Fortschritt</span>
                          <span className="font-semibold text-slate-900">
                            {stats.completionPercentage}%
                          </span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${module.color} transition-all duration-500`}
                            style={{ width: `${stats.completionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Circular Badge */}
                    <div className="ml-6 relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-slate-200"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - stats.completionPercentage / 100)}`}
                          className={module.color.replace("bg-", "text-")}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-slate-900">
                          {stats.completionPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{stats.daysCompleted}</p>
                      <p className="text-xs text-slate-600 mt-1">Tage</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{stats.timeSpent}h</p>
                      <p className="text-xs text-slate-600 mt-1">Lernzeit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {stats.completionPercentage >= 80 ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">Zertifikat</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/modul/${module.id}`}>
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                      {stats.started ? "Weiter lernen" : "Modul starten"}
                    </div>
</Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Achievements & Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Erfolge & Meilensteine</CardTitle>
          <CardDescription>Ihre erreichten Ziele und Auszeichnungen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* First Day */}
            <div className={`p-4 rounded-lg border-2 ${progress.currentStreak >= 1 ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-2 ${progress.currentStreak >= 1 ? 'bg-blue-100' : 'bg-slate-200'}`}>
                  <Calendar className={`w-6 h-6 ${progress.currentStreak >= 1 ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <p className="font-semibold text-sm">Erster Tag</p>
                <p className="text-xs text-slate-600 mt-1">Lernreise begonnen</p>
              </div>
            </div>

            {/* 7 Day Streak */}
            <div className={`p-4 rounded-lg border-2 ${progress.longestStreak >= 7 ? 'border-orange-500 bg-orange-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-2 ${progress.longestStreak >= 7 ? 'bg-orange-100' : 'bg-slate-200'}`}>
                  <Flame className={`w-6 h-6 ${progress.longestStreak >= 7 ? 'text-orange-600' : 'text-slate-400'}`} />
                </div>
                <p className="font-semibold text-sm">7-Tage-Streak</p>
                <p className="text-xs text-slate-600 mt-1">Konsequent gelernt</p>
              </div>
            </div>

            {/* 50% Progress */}
            <div className={`p-4 rounded-lg border-2 ${progress.overallCompletionPercentage >= 50 ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-2 ${progress.overallCompletionPercentage >= 50 ? 'bg-green-100' : 'bg-slate-200'}`}>
                  <Target className={`w-6 h-6 ${progress.overallCompletionPercentage >= 50 ? 'text-green-600' : 'text-slate-400'}`} />
                </div>
                <p className="font-semibold text-sm">Halbzeit</p>
                <p className="text-xs text-slate-600 mt-1">50% erreicht</p>
              </div>
            </div>

            {/* First Certificate */}
            <div className={`p-4 rounded-lg border-2 ${completedModules >= 1 ? 'border-purple-500 bg-purple-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full mb-2 ${completedModules >= 1 ? 'bg-purple-100' : 'bg-slate-200'}`}>
                  <Award className={`w-6 h-6 ${completedModules >= 1 ? 'text-purple-600' : 'text-slate-400'}`} />
                </div>
                <p className="font-semibold text-sm">Erstes Zertifikat</p>
                <p className="text-xs text-slate-600 mt-1">Modul abgeschlossen</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
