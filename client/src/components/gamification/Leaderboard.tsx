import { useState } from 'react';
import { LeaderboardEntry, getLeaderboard } from '@/lib/gamification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp, Flame } from 'lucide-react';

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'global' | 'weekly' | 'monthly'>('global');
  
  const leaderboard = getLeaderboard(timeframe);
  
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Rangliste
            </CardTitle>
            <CardDescription>
              Vergleiche dich mit anderen Lernenden
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as typeof timeframe)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="global">Gesamt</TabsTrigger>
            <TabsTrigger value="weekly">Wöchentlich</TabsTrigger>
            <TabsTrigger value="monthly">Monatlich</TabsTrigger>
          </TabsList>
          
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                  entry.isCurrentUser
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted/30 hover:bg-muted/50'
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background font-bold text-lg">
                  {getMedalIcon(entry.rank) || `#${entry.rank}`}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold truncate ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                      {entry.username}
                    </span>
                    {entry.isCurrentUser && (
                      <Badge variant="default" className="text-xs">Du</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Level {entry.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {entry.badgeCount} Badges
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {entry.streak} Tage
                    </span>
                  </div>
                </div>
                
                {/* Points */}
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {entry.totalPoints.toLocaleString('de-DE')}
                  </div>
                  <div className="text-xs text-muted-foreground">Punkte</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Rewards Info */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Belohnungen</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="font-semibold">🥇 Platz 1</div>
                <div className="text-muted-foreground">
                  {timeframe === 'weekly' ? '1.000' : '5.000'} Punkte
                </div>
              </div>
              <div>
                <div className="font-semibold">🥈 Platz 2</div>
                <div className="text-muted-foreground">
                  {timeframe === 'weekly' ? '500' : '2.500'} Punkte
                </div>
              </div>
              <div>
                <div className="font-semibold">🥉 Platz 3</div>
                <div className="text-muted-foreground">
                  {timeframe === 'weekly' ? '250' : '1.000'} Punkte
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
