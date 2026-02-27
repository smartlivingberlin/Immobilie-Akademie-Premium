import { useState } from 'react';
import { Badge as BadgeType, BADGE_DEFINITIONS } from '@/lib/gamification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Sparkles } from 'lucide-react';

interface BadgeGalleryProps {
  badges: BadgeType[];
  stats?: {
    totalDaysCompleted?: number;
    totalQuizzesPassed?: number;
    totalCalculatorsUsed?: number;
    totalGlossaryTermsLearned?: number;
    totalCertificatesEarned?: number;
  };
  streak?: number;
}

export function BadgeGallery({ badges, stats, streak }: BadgeGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;
  
  const categories = [
    { id: 'all', label: 'Alle', count: totalCount },
    { id: 'learning', label: 'Lernfortschritt', count: badges.filter(b => b.category === 'learning').length },
    { id: 'quiz', label: 'Quiz', count: badges.filter(b => b.category === 'quiz').length },
    { id: 'streak', label: 'Streak', count: badges.filter(b => b.category === 'streak').length },
    { id: 'practice', label: 'Praxis', count: badges.filter(b => b.category === 'practice').length },
    { id: 'special', label: 'Spezial', count: badges.filter(b => b.category === 'special').length },
  ];
  
  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter(b => b.category === selectedCategory);
  
  // Calculate progress for each badge
  const getBadgeProgress = (badge: BadgeType): { current: number; required: number; percentage: number } | null => {
    if (badge.unlocked || !badge.requirement || !stats) return null;
    
    let current = 0;
    
    switch (badge.id) {
      case 'first_day':
      case 'curious':
      case 'expert':
      case 'master':
      case 'legend':
        current = stats.totalDaysCompleted || 0;
        break;
      case 'bookworm':
      case 'knowledge_giant':
        current = stats.totalGlossaryTermsLearned || 0;
        break;
      case 'goal_oriented':
      case 'high_flyer':
      case 'completer':
      case 'certified':
      case 'fully_certified':
        current = stats.totalCertificatesEarned || 0;
        break;
      case 'quiz_starter':
      case 'quiz_pro':
      case 'quiz_champion':
      case 'quiz_legend':
        current = stats.totalQuizzesPassed || 0;
        break;
      case 'calculator_artist':
      case 'data_analyst':
      case 'practice_pro':
        current = stats.totalCalculatorsUsed || 0;
        break;
      case 'streak_3':
      case 'streak_7':
      case 'streak_14':
      case 'streak_30':
      case 'streak_60':
      case 'streak_100':
      case 'streak_365':
        current = streak || 0;
        break;
      default:
        return null;
    }
    
    const percentage = Math.min(100, (current / badge.requirement) * 100);
    return { current, required: badge.requirement, percentage };
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Badge-Sammlung</h2>
          <p className="text-muted-foreground">
            {unlockedCount} von {totalCount} Badges freigeschaltet
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{Math.round((unlockedCount / totalCount) * 100)}%</div>
          <p className="text-sm text-muted-foreground">Fortschritt</p>
        </div>
      </div>
      
      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
              {cat.label}
              <Badge variant="secondary" className="ml-1 text-xs">
                {badges.filter(b => cat.id === 'all' || b.category === cat.id).filter(b => b.unlocked).length}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Badge Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-6">
          {filteredBadges.map(badge => {
            const progress = getBadgeProgress(badge);
            
            return (
              <Card
                key={badge.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  badge.unlocked
                    ? 'border-primary/50 bg-gradient-to-br from-primary/5 to-transparent'
                    : 'opacity-60 grayscale'
                }`}
              >
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{badge.icon}</div>
                    {badge.unlocked ? (
                      <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <CardTitle className="text-sm font-semibold mb-1">
                    {badge.name}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    {badge.description}
                  </CardDescription>
                  
                  {/* Progress Bar */}
                  {progress && !badge.unlocked && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progress.current} / {progress.required}</span>
                        <span>{Math.round(progress.percentage)}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Unlocked Date */}
                  {badge.unlocked && badge.unlockedAt && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      Freigeschaltet: {new Date(badge.unlockedAt).toLocaleDateString('de-DE')}
                    </div>
                  )}
                </CardContent>
                
                {/* Shine Effect for Unlocked Badges */}
                {badge.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" />
                )}
              </Card>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
