import { useEffect, useState } from 'react';
import {
  loadGamificationData,
  GamificationData,
  getLevelTitle,
  getPointsForNextLevel,
  LEVEL_THRESHOLDS,
} from '@/lib/gamification';
import { BadgeGallery } from '@/components/gamification/BadgeGallery';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Flame,
  TrendingUp,
  Award,
  Target,
  Calendar,
  BarChart3,
  Zap,
} from 'lucide-react';

export default function GamificationDashboard() {
  const [data, setData] = useState<GamificationData | null>(null);
  
  useEffect(() => {
    const gamificationData = loadGamificationData();
    setData(gamificationData);
  }, []);
  
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const currentLevelPoints = LEVEL_THRESHOLDS[data.level];
  const nextLevelPoints = getPointsForNextLevel(data.level);
  const pointsInCurrentLevel = data.totalPoints - currentLevelPoints;
  const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
  const progressPercentage = (pointsInCurrentLevel / pointsNeededForNextLevel) * 100;
  
  const unlockedBadges = data.badges.filter(b => b.unlocked).length;
  const totalBadges = data.badges.length;
  
  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 border">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Level {data.level}: {getLevelTitle(data.level)}
              </h1>
              <p className="text-muted-foreground">
                Deine Gamification-Übersicht
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-primary">
                {data.totalPoints.toLocaleString('de-DE')}
              </div>
              <p className="text-sm text-muted-foreground">Gesamt-Punkte</p>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                Fortschritt zu Level {data.level + 1}
              </span>
              <span className="text-muted-foreground">
                {pointsInCurrentLevel.toLocaleString('de-DE')} / {pointsNeededForNextLevel.toLocaleString('de-DE')} Punkte
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground">
              Noch {(nextLevelPoints - data.totalPoints).toLocaleString('de-DE')} Punkte bis zum nächsten Level
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.streak}</div>
                  <div className="text-xs text-muted-foreground">Tage Streak</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{unlockedBadges}</div>
                  <div className="text-xs text-muted-foreground">Badges</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">#23</div>
                  <div className="text-xs text-muted-foreground">Rang</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{data.stats.totalDaysCompleted}</div>
                  <div className="text-xs text-muted-foreground">Tage</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-0" />
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="leaderboard">Rangliste</TabsTrigger>
          <TabsTrigger value="stats">Statistiken</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Letzte Erfolge
                </CardTitle>
                <CardDescription>
                  Deine neuesten Errungenschaften
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.achievements.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Noch keine Erfolge. Starte jetzt mit dem Lernen!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {data.achievements.slice(0, 5).map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="text-2xl">
                          {achievement.type === 'badge' ? '🏆' : 
                           achievement.type === 'level' ? '⬆️' :
                           achievement.type === 'streak' ? '🔥' : '🎯'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">{achievement.title}</div>
                          <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(achievement.date).toLocaleDateString('de-DE')} • +{achievement.points} Punkte
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Points History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Punkte-Verlauf
                </CardTitle>
                <CardDescription>
                  Deine letzten Aktivitäten
                </CardDescription>
              </CardHeader>
              <CardContent>
                {data.pointsHistory.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Noch keine Aktivitäten. Starte jetzt mit dem Lernen!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {data.pointsHistory.slice(0, 8).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {transaction.activity}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString('de-DE', {
                              day: '2-digit',
                              month: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">
                            +{transaction.points}
                          </div>
                          {transaction.multiplier > 1 && (
                            <div className="text-xs text-muted-foreground">
                              ×{transaction.multiplier}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Leaderboard Preview */}
          <Leaderboard />
        </TabsContent>
        
        {/* Badges Tab */}
        <TabsContent value="badges">
          <BadgeGallery
            badges={data.badges}
            stats={data.stats}
            streak={data.streak}
          />
        </TabsContent>
        
        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Leaderboard />
        </TabsContent>
        
        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Gesamt-Punkte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.totalPoints.toLocaleString('de-DE')}</div>
                <p className="text-xs text-muted-foreground mt-1">Alle Zeit</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Tage abgeschlossen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.totalDaysCompleted}</div>
                <p className="text-xs text-muted-foreground mt-1">Von 220 Tagen</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quizze bestanden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.totalQuizzesPassed}</div>
                <p className="text-xs text-muted-foreground mt-1">Von 50 Quizzen</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Aktueller Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Flame className="h-8 w-8 text-orange-500" />
                  {data.streak}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Tage hintereinander</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Längster Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.longestStreak}</div>
                <p className="text-xs text-muted-foreground mt-1">Tage Rekord</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Badges freigeschaltet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{unlockedBadges} / {totalBadges}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((unlockedBadges / totalBadges) * 100)}% Fortschritt
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Praxisrechner genutzt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.totalCalculatorsUsed}</div>
                <p className="text-xs text-muted-foreground mt-1">Berechnungen durchgeführt</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Glossar-Begriffe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.totalGlossaryTermsLearned}</div>
                <p className="text-xs text-muted-foreground mt-1">Begriffe gelernt</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Zertifikate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.stats.totalCertificatesEarned}</div>
                <p className="text-xs text-muted-foreground mt-1">Module abgeschlossen</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
