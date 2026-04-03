/**
 * Gamification System
 * Manages points, badges, levels, streaks, and leaderboards
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface GamificationData {
  totalPoints: number;
  level: number;
  streak: number;
  lastActivityDate: string;
  badges: Badge[];
  pointsHistory: PointTransaction[];
  achievements: Achievement[];
  stats: UserStats;
}

export interface PointTransaction {
  id: string;
  date: string;
  activity: string;
  points: number;
  multiplier: number;
  totalPoints: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement?: number;
}

export type BadgeCategory = 'learning' | 'quiz' | 'streak' | 'practice' | 'special';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  points: number;
  type: 'badge' | 'level' | 'streak' | 'milestone';
}

export interface UserStats {
  totalDaysCompleted: number;
  totalQuizzesPassed: number;
  totalFlashcardsMastered: number;
  totalCalculatorsUsed: number;
  totalGlossaryTermsLearned: number;
  totalCertificatesEarned: number;
  totalLogins: number;
  longestStreak: number;
  currentStreak: number;
  averagePointsPerDay: number;
  mostActiveWeek: { start: string; points: number };
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  level: number;
  totalPoints: number;
  badgeCount: number;
  streak: number;
  isCurrentUser?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'gamification_data';

// Point values for activities
export const POINT_VALUES = {
  DAY_COMPLETED: 100,
  QUIZ_PASSED: 50,
  FLASHCARD_MASTERED: 10,
  CALCULATOR_USED: 20,
  GLOSSARY_TERM_LEARNED: 5,
  CERTIFICATE_EARNED: 500,
  DAILY_LOGIN: 10,
  STREAK_7_DAYS: 100,
  STREAK_30_DAYS: 500,
  AI_TUTOR_QUESTION: 5,
  MODULE_COMPLETED: 1000,
  ALL_MODULES_COMPLETED: 5000,
} as const;

// Streak multipliers
export const STREAK_MULTIPLIERS = {
  7: 1.1,   // +10%
  14: 1.2,  // +20%
  30: 1.5,  // +50%
  60: 2.0,  // +100%
} as const;

// Level thresholds (Level N = 100 * N²)
export const LEVEL_THRESHOLDS = Array.from({ length: 51 }, (_, i) => {
  if (i === 0) return 0;
  return 100 * i * i;
});

// Level titles
export const LEVEL_TITLES: Record<number, string> = {
  1: 'Neuling',
  2: 'Anfänger',
  3: 'Lernender',
  4: 'Fortgeschrittener',
  5: 'Wissbegieriger',
  10: 'Experte',
  15: 'Meister',
  20: 'Profi',
  25: 'Champion',
  30: 'Legende',
  40: 'Titan',
  50: 'Gott',
};

// ============================================================================
// BADGE DEFINITIONS
// ============================================================================

export const BADGE_DEFINITIONS: Omit<Badge, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  // Learning Progress (10 badges)
  { id: 'first_day', name: 'Einsteiger', description: 'Ersten Tag abgeschlossen', icon: '🎓', category: 'learning', requirement: 1 },
  { id: 'curious', name: 'Wissbegierig', description: '10 Tage abgeschlossen', icon: '📚', category: 'learning', requirement: 10 },
  { id: 'expert', name: 'Experte', description: '50 Tage abgeschlossen', icon: '🏆', category: 'learning', requirement: 50 },
  { id: 'master', name: 'Meister', description: '100 Tage abgeschlossen', icon: '🌟', category: 'learning', requirement: 100 },
  { id: 'legend', name: 'Legende', description: 'Alle 240 Tage abgeschlossen', icon: '👑', category: 'learning', requirement: 240 },
  { id: 'bookworm', name: 'Bücherwurm', description: '50 Glossar-Begriffe gelernt', icon: '📖', category: 'learning', requirement: 50 },
  { id: 'knowledge_giant', name: 'Wissensriese', description: '100 Glossar-Begriffe gelernt', icon: '🧠', category: 'learning', requirement: 100 },
  { id: 'goal_oriented', name: 'Zielstrebig', description: 'Erstes Modul abgeschlossen', icon: '🎯', category: 'learning', requirement: 1 },
  { id: 'high_flyer', name: 'Überflieger', description: '3 Module abgeschlossen', icon: '🚀', category: 'learning', requirement: 3 },
  { id: 'completer', name: 'Vollender', description: 'Alle 5 Module abgeschlossen', icon: '💎', category: 'learning', requirement: 5 },
  
  // Quiz Mastery (8 badges)
  { id: 'quiz_starter', name: 'Quiz-Starter', description: 'Erstes Quiz bestanden', icon: '✅', category: 'quiz', requirement: 1 },
  { id: 'quiz_pro', name: 'Quiz-Profi', description: '10 Quizze bestanden', icon: '🎓', category: 'quiz', requirement: 10 },
  { id: 'quiz_champion', name: 'Quiz-Champion', description: '25 Quizze bestanden', icon: '🏅', category: 'quiz', requirement: 25 },
  { id: 'quiz_legend', name: 'Quiz-Legende', description: 'Alle 50 Quizze bestanden', icon: '🏆', category: 'quiz', requirement: 50 },
  { id: 'perfectionist', name: 'Perfektionist', description: 'Quiz mit 100% bestanden', icon: '💯', category: 'quiz', requirement: 1 },
  { id: 'accurate', name: 'Treffsicher', description: '10 Quizze mit 90%+ bestanden', icon: '🎯', category: 'quiz', requirement: 10 },
  { id: 'thinking_machine', name: 'Denkmaschine', description: '25 Quizze mit 90%+ bestanden', icon: '🧠', category: 'quiz', requirement: 25 },
  { id: 'lightning_thinker', name: 'Blitzdenker', description: 'Quiz in unter 5 Min. bestanden', icon: '⚡', category: 'quiz', requirement: 1 },
  
  // Streak Achievements (7 badges)
  { id: 'streak_3', name: 'Streak-Starter', description: '3 Tage Streak', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'streak_7', name: 'Wochenkämpfer', description: '7 Tage Streak', icon: '🌟', category: 'streak', requirement: 7 },
  { id: 'streak_14', name: 'Durchhalter', description: '14 Tage Streak', icon: '💪', category: 'streak', requirement: 14 },
  { id: 'streak_30', name: 'Marathon-Läufer', description: '30 Tage Streak', icon: '🏃', category: 'streak', requirement: 30 },
  { id: 'streak_60', name: 'Unaufhaltsam', description: '60 Tage Streak', icon: '🦅', category: 'streak', requirement: 60 },
  { id: 'streak_100', name: 'Legende', description: '100 Tage Streak', icon: '🚀', category: 'streak', requirement: 100 },
  { id: 'streak_365', name: 'Unsterblich', description: '365 Tage Streak', icon: '👑', category: 'streak', requirement: 365 },
  
  // Practice Application (5 badges)
  { id: 'calculator_artist', name: 'Rechenkünstler', description: '10 Praxisrechner genutzt', icon: '🔢', category: 'practice', requirement: 10 },
  { id: 'data_analyst', name: 'Daten-Analyst', description: '50 Praxisrechner genutzt', icon: '📊', category: 'practice', requirement: 50 },
  { id: 'practice_pro', name: 'Praxis-Profi', description: 'Alle Praxisrechner genutzt', icon: '💼', category: 'practice', requirement: 10 },
  { id: 'certified', name: 'Zertifiziert', description: 'Erstes Zertifikat erhalten', icon: '🎓', category: 'practice', requirement: 1 },
  { id: 'fully_certified', name: 'Vollständig zertifiziert', description: 'Alle Zertifikate erhalten', icon: '🏆', category: 'practice', requirement: 5 },
  
  // Special Achievements (5 badges)
  { id: 'night_owl', name: 'Nachteule', description: 'Lernen nach 22 Uhr', icon: '🌙', category: 'special', requirement: 1 },
  { id: 'early_bird', name: 'Frühaufsteher', description: 'Lernen vor 6 Uhr', icon: '🌅', category: 'special', requirement: 1 },
  { id: 'birthday_learner', name: 'Geburtstagskind', description: 'Lernen am eigenen Geburtstag', icon: '🎉', category: 'special', requirement: 1 },
  { id: 'christmas_learner', name: 'Weihnachts-Lerner', description: 'Lernen am 24./25./26. Dezember', icon: '🎄', category: 'special', requirement: 1 },
  { id: 'new_year_learner', name: 'Silvester-Lerner', description: 'Lernen am 31. Dezember', icon: '🎆', category: 'special', requirement: 1 },
];

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Initialize gamification data
 */
export function initializeGamification(): GamificationData {
  const data: GamificationData = {
    totalPoints: 0,
    level: 1,
    streak: 0,
    lastActivityDate: '',
    badges: BADGE_DEFINITIONS.map(badge => ({ ...badge, unlocked: false })),
    pointsHistory: [],
    achievements: [],
    stats: {
      totalDaysCompleted: 0,
      totalQuizzesPassed: 0,
      totalFlashcardsMastered: 0,
      totalCalculatorsUsed: 0,
      totalGlossaryTermsLearned: 0,
      totalCertificatesEarned: 0,
      totalLogins: 0,
      longestStreak: 0,
      currentStreak: 0,
      averagePointsPerDay: 0,
      mostActiveWeek: { start: '', points: 0 },
    },
  };
  
  saveGamificationData(data);
  return data;
}

/**
 * Load gamification data from localStorage
 */
export function loadGamificationData(): GamificationData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initializeGamification();
    }
    
    const data: GamificationData = JSON.parse(stored);
    
    // Merge with new badge definitions (in case new badges were added)
    const existingBadgeIds = new Set(data.badges.map(b => b.id));
    const newBadges = BADGE_DEFINITIONS
      .filter(b => !existingBadgeIds.has(b.id))
      .map(badge => ({ ...badge, unlocked: false }));
    
    data.badges = [...data.badges, ...newBadges];
    
    return data;
  } catch (error) {
    console.error('Failed to load gamification data:', error);
    return initializeGamification();
  }
}

/**
 * Save gamification data to localStorage
 */
export function saveGamificationData(data: GamificationData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save gamification data:', error);
  }
}

/**
 * Add points for an activity
 */
export function addPoints(
  activity: string,
  basePoints: number,
  data?: GamificationData
): { data: GamificationData; leveledUp: boolean; newBadges: Badge[] } {
  const gamificationData = data || loadGamificationData();
  
  // Calculate multiplier based on streak
  let multiplier = 1;
  for (const [days, mult] of Object.entries(STREAK_MULTIPLIERS).reverse()) {
    if (gamificationData.streak >= parseInt(days)) {
      multiplier = mult;
      break;
    }
  }
  
  const points = Math.round(basePoints * multiplier);
  const previousLevel = gamificationData.level;
  
  gamificationData.totalPoints += points;
  
  // Add to history
  const transaction: PointTransaction = {
    id: `${Date.now()}-${Math.random()}`,
    date: new Date().toISOString(),
    activity,
    points,
    multiplier,
    totalPoints: gamificationData.totalPoints,
  };
  gamificationData.pointsHistory.unshift(transaction);
  
  // Keep only last 100 transactions
  if (gamificationData.pointsHistory.length > 100) {
    gamificationData.pointsHistory = gamificationData.pointsHistory.slice(0, 100);
  }
  
  // Update level
  gamificationData.level = calculateLevel(gamificationData.totalPoints);
  const leveledUp = gamificationData.level > previousLevel;
  
  // Check for new badges
  const newBadges = checkAndUnlockBadges(gamificationData);
  
  // Save
  saveGamificationData(gamificationData);
  
  return { data: gamificationData, leveledUp, newBadges };
}

/**
 * Calculate level from total points
 */
export function calculateLevel(totalPoints: number): number {
  for (let level = LEVEL_THRESHOLDS.length - 1; level >= 0; level--) {
    if (totalPoints >= LEVEL_THRESHOLDS[level]) {
      return level;
    }
  }
  return 1;
}

/**
 * Get points required for next level
 */
export function getPointsForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length - 1) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  }
  return LEVEL_THRESHOLDS[currentLevel + 1];
}

/**
 * Get level title
 */
export function getLevelTitle(level: number): string {
  // Find the closest defined title
  const definedLevels = Object.keys(LEVEL_TITLES).map(Number).sort((a, b) => b - a);
  for (const definedLevel of definedLevels) {
    if (level >= definedLevel) {
      return LEVEL_TITLES[definedLevel];
    }
  }
  return LEVEL_TITLES[1];
}

/**
 * Update streak
 */
export function updateStreak(data?: GamificationData): GamificationData {
  const gamificationData = data || loadGamificationData();
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = gamificationData.lastActivityDate.split('T')[0];
  
  if (lastActivity === today) {
    // Already logged today, no change
    return gamificationData;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (lastActivity === yesterdayStr) {
    // Consecutive day, increment streak
    gamificationData.streak += 1;
    gamificationData.stats.currentStreak = gamificationData.streak;
    
    if (gamificationData.streak > gamificationData.stats.longestStreak) {
      gamificationData.stats.longestStreak = gamificationData.streak;
    }
  } else if (lastActivity < yesterdayStr) {
    // Streak broken, reset
    gamificationData.streak = 1;
    gamificationData.stats.currentStreak = 1;
  }
  
  gamificationData.lastActivityDate = new Date().toISOString();
  gamificationData.stats.totalLogins += 1;
  
  // Check for streak badges
  checkAndUnlockBadges(gamificationData);
  
  saveGamificationData(gamificationData);
  return gamificationData;
}

/**
 * Check and unlock badges
 */
export function checkAndUnlockBadges(data: GamificationData): Badge[] {
  const newBadges: Badge[] = [];
  
  data.badges.forEach(badge => {
    if (badge.unlocked) return;
    
    let shouldUnlock = false;
    
    // Check conditions based on badge ID
    switch (badge.id) {
      // Learning Progress
      case 'first_day':
        shouldUnlock = data.stats.totalDaysCompleted >= 1;
        break;
      case 'curious':
        shouldUnlock = data.stats.totalDaysCompleted >= 10;
        break;
      case 'expert':
        shouldUnlock = data.stats.totalDaysCompleted >= 50;
        break;
      case 'master':
        shouldUnlock = data.stats.totalDaysCompleted >= 100;
        break;
      case 'legend':
        shouldUnlock = data.stats.totalDaysCompleted >= 240;
        break;
      case 'bookworm':
        shouldUnlock = data.stats.totalGlossaryTermsLearned >= 50;
        break;
      case 'knowledge_giant':
        shouldUnlock = data.stats.totalGlossaryTermsLearned >= 100;
        break;
      case 'goal_oriented':
        shouldUnlock = data.stats.totalCertificatesEarned >= 1;
        break;
      case 'high_flyer':
        shouldUnlock = data.stats.totalCertificatesEarned >= 3;
        break;
      case 'completer':
        shouldUnlock = data.stats.totalCertificatesEarned >= 5;
        break;
      
      // Quiz Mastery
      case 'quiz_starter':
        shouldUnlock = data.stats.totalQuizzesPassed >= 1;
        break;
      case 'quiz_pro':
        shouldUnlock = data.stats.totalQuizzesPassed >= 10;
        break;
      case 'quiz_champion':
        shouldUnlock = data.stats.totalQuizzesPassed >= 25;
        break;
      case 'quiz_legend':
        shouldUnlock = data.stats.totalQuizzesPassed >= 50;
        break;
      
      // Streak Achievements
      case 'streak_3':
        shouldUnlock = data.streak >= 3;
        break;
      case 'streak_7':
        shouldUnlock = data.streak >= 7;
        break;
      case 'streak_14':
        shouldUnlock = data.streak >= 14;
        break;
      case 'streak_30':
        shouldUnlock = data.streak >= 30;
        break;
      case 'streak_60':
        shouldUnlock = data.streak >= 60;
        break;
      case 'streak_100':
        shouldUnlock = data.streak >= 100;
        break;
      case 'streak_365':
        shouldUnlock = data.streak >= 365;
        break;
      
      // Practice Application
      case 'calculator_artist':
        shouldUnlock = data.stats.totalCalculatorsUsed >= 10;
        break;
      case 'data_analyst':
        shouldUnlock = data.stats.totalCalculatorsUsed >= 50;
        break;
      case 'practice_pro':
        shouldUnlock = data.stats.totalCalculatorsUsed >= 10; // All calculators
        break;
      case 'certified':
        shouldUnlock = data.stats.totalCertificatesEarned >= 1;
        break;
      case 'fully_certified':
        shouldUnlock = data.stats.totalCertificatesEarned >= 5;
        break;
      
      // Special Achievements
      case 'night_owl':
        shouldUnlock = new Date().getHours() >= 22;
        break;
      case 'early_bird':
        shouldUnlock = new Date().getHours() < 6;
        break;
      case 'birthday_learner':
        // Would need user's birthday - skip for now
        break;
      case 'christmas_learner':
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        shouldUnlock = month === 12 && (day === 24 || day === 25 || day === 26);
        break;
      case 'new_year_learner':
        shouldUnlock = new Date().getMonth() === 11 && new Date().getDate() === 31;
        break;
    }
    
    if (shouldUnlock) {
      badge.unlocked = true;
      badge.unlockedAt = new Date().toISOString();
      newBadges.push(badge);
      
      // Add achievement
      data.achievements.unshift({
        id: `achievement-${Date.now()}`,
        title: `Badge freigeschaltet: ${badge.name}`,
        description: badge.description,
        date: new Date().toISOString(),
        points: 50,
        type: 'badge',
      });
      
      // Bonus points
      data.totalPoints += 50;
    }
  });
  
  return newBadges;
}

/**
 * Update activity stats
 */
export function updateStats(
  activity: 'day' | 'quiz' | 'flashcard' | 'calculator' | 'glossary' | 'certificate',
  data?: GamificationData
): GamificationData {
  const gamificationData = data || loadGamificationData();
  
  switch (activity) {
    case 'day':
      gamificationData.stats.totalDaysCompleted += 1;
      break;
    case 'quiz':
      gamificationData.stats.totalQuizzesPassed += 1;
      break;
    case 'flashcard':
      gamificationData.stats.totalFlashcardsMastered += 1;
      break;
    case 'calculator':
      gamificationData.stats.totalCalculatorsUsed += 1;
      break;
    case 'glossary':
      gamificationData.stats.totalGlossaryTermsLearned += 1;
      break;
    case 'certificate':
      gamificationData.stats.totalCertificatesEarned += 1;
      break;
  }
  
  saveGamificationData(gamificationData);
  return gamificationData;
}

/**
 * Get leaderboard (mock data for now - would need backend)
 */
export function getLeaderboard(type: 'global' | 'weekly' | 'monthly' = 'global'): LeaderboardEntry[] {
  // Mock data - in production, this would come from backend
  const currentUser = loadGamificationData();
  
  return [
    { rank: 1, username: 'Anna Schmidt', level: 20, totalPoints: 45200, badgeCount: 28, streak: 42 },
    { rank: 2, username: 'Max Müller', level: 18, totalPoints: 38800, badgeCount: 25, streak: 35 },
    { rank: 3, username: 'Lisa Weber', level: 17, totalPoints: 34500, badgeCount: 23, streak: 28 },
    { rank: 4, username: 'Tom Fischer', level: 16, totalPoints: 30200, badgeCount: 21, streak: 21 },
    { rank: 5, username: 'Sarah Klein', level: 15, totalPoints: 27500, badgeCount: 20, streak: 18 },
    { rank: 23, username: 'Du', level: currentUser.level, totalPoints: currentUser.totalPoints, badgeCount: currentUser.badges.filter(b => b.unlocked).length, streak: currentUser.streak, isCurrentUser: true },
  ];
}

/**
 * Export gamification data (for debugging)
 */
export function exportGamificationData(): string {
  const data = loadGamificationData();
  return JSON.stringify(data, null, 2);
}

/**
 * Reset gamification data (for testing)
 */
export function resetGamificationData(): void {
  localStorage.removeItem(STORAGE_KEY);
  initializeGamification();
}
