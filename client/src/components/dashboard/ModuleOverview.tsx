import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  BookOpen, 
  Search, 
  Building, 
  Gavel, 
  GraduationCap, 
  ArrowRight, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Modul 1: Einführung",
    description: "Grundlagen der Immobilienwirtschaft und Berufsbild.",
    icon: BookOpen,
    path: "/modul/1",
    progress: 100,
    status: "completed",
    duration: "160 UE"
  },
  {
    id: 2,
    title: "Modul 2: Makler §34c",
    description: "Rechtliche Rahmenbedingungen und Maklerpraxis.",
    icon: Search,
    path: "/modul/2",
    progress: 100,
    status: "completed",
    duration: "480 UE"
  },
  {
    id: 3,
    title: "Modul 3: Verwaltung (WEG)",
    description: "WEG-Verwaltung, Mietverwaltung und Technik.",
    icon: Building,
    path: "/modul/3",
    progress: 100,
    status: "completed",
    duration: "480 UE"
  },
  {
    id: 4,
    title: "Modul 4: Gutachten & Sachverständiger",
    description: "Wertermittlung, Gutachtenerstellung und Sachverständigenwesen.",
    icon: Gavel,
    path: "/modul/4",
    progress: 100,
    status: "completed",
    duration: "320 UE"
  },
  {
    id: 5,
    title: "Modul 5: Prüfung & §34i",
    description: "Immobiliardarlehensvermittlung und Prüfungsvorbereitung.",
    icon: GraduationCap,
    path: "/modul/5",
    progress: 100,
    status: "completed",
    duration: "320 UE"
  }
];

export function ModuleOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module) => {
        const Icon = module.icon;
        const isLocked = module.status === "locked";
        
        return (
          <Card key={module.id} className={`flex flex-col transition-all hover:shadow-md ${isLocked ? 'opacity-70 bg-slate-50' : 'border-blue-100 bg-white'}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <div className={`p-2 rounded-lg ${isLocked ? 'bg-slate-200 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                  <Icon className="h-6 w-6" />
                </div>
                {module.status === "completed" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verfügbar
                  </Badge>
                )}
                {module.status === "in-progress" && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                    <Clock className="h-3 w-3 mr-1" />
                    In Bearbeitung
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl">{module.title}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">
                {module.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-3 flex-1">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Status</span>
                  <span>{module.status === 'completed' ? 'Bereit' : `${module.progress}%`}</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Clock className="h-3 w-3 mr-1" />
                  {module.duration}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Link href={module.path}>
<div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                  {isLocked ? "Noch gesperrt" : "Modul starten"}
                  {!isLocked && <ArrowRight className="ml-2 h-4 w-4" />}
                </div>
</Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
