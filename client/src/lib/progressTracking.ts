import { getModuleDayCount } from "@shared/moduleMeta";

// Progress Tracking System for Learning Portal
// Tracks completion of days, flashcards, and quiz results per module

export interface DayProgress {
  dayId: number;
  completed: boolean;
  completedAt?: string; // ISO date string
  timeSpent: number; // in minutes
}

export interface FlashcardProgress {
  totalCards: number;
  masteredCards: number; // Cards with easeFactor >= 2.5
  reviewedCards: number;
  lastReviewDate?: string;
}

export interface QuizProgress {
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number; // 0-100
  lastQuizDate?: string;
}

export interface ModuleProgress {
  moduleId: number;
  days: Record<number, DayProgress>;
  flashcards: FlashcardProgress;
  quiz: QuizProgress;
  totalTimeSpent: number; // in minutes
  completionPercentage: number; // 0-100
  startedAt?: string;
  completedAt?: string;
}

export interface UserProgress {
  modules: Record<number, ModuleProgress>;
  overallCompletionPercentage: number;
  totalTimeSpent: number;
  currentStreak: number; // days in a row
  longestStreak: number;
  lastActivityDate?: string;
}

const PROGRESS_KEY = "learning-progress";
const ACTIVITY_LOG_KEY = "activity-log";

// Initialize empty progress structure
function getEmptyModuleProgress(moduleId: number, totalDays: number): ModuleProgress {
  return {
    moduleId,
    days: {},
    flashcards: {
      totalCards: 0,
      masteredCards: 0,
      reviewedCards: 0,
    },
    quiz: {
      totalQuizzes: 0,
      completedQuizzes: 0,
      averageScore: 0,
    },
    totalTimeSpent: 0,
    completionPercentage: 0,
  };
}

// Get all progress data
export function getProgress(): UserProgress {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) {
    return {
      modules: {},
      overallCompletionPercentage: 0,
      totalTimeSpent: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  }
  return JSON.parse(stored);
}

// Save progress data
function saveProgress(progress: UserProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// Get module progress (create if doesn't exist)
export function getModuleProgress(moduleId: number, totalDays: number): ModuleProgress {
  const progress = getProgress();
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = getEmptyModuleProgress(moduleId, totalDays);
    saveProgress(progress);
  }
  return progress.modules[moduleId];
}

// Mark a day as completed
export function markDayCompleted(moduleId: number, dayId: number, timeSpent: number = 0): void {
  const progress = getProgress();
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = getEmptyModuleProgress(moduleId, 100); // Default max days
  }

  const module = progress.modules[moduleId];
  
  // Update day progress
  if (!module.days[dayId]) {
    module.days[dayId] = {
      dayId,
      completed: true,
      completedAt: new Date().toISOString(),
      timeSpent,
    };
  } else {
    module.days[dayId].completed = true;
    module.days[dayId].completedAt = new Date().toISOString();
    module.days[dayId].timeSpent += timeSpent;
  }

  // Update total time
  module.totalTimeSpent += timeSpent;
  progress.totalTimeSpent += timeSpent;

  // Update activity log for streak calculation
  updateActivityLog();

  // Recalculate completion percentage
  recalculateModuleCompletion(moduleId);
  
  saveProgress(progress);
}

// Add time spent on a day (without marking as completed)
export function addTimeSpent(moduleId: number, dayId: number, timeSpent: number): void {
  const progress = getProgress();
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = getEmptyModuleProgress(moduleId, 100);
  }

  const module = progress.modules[moduleId];
  
  if (!module.days[dayId]) {
    module.days[dayId] = {
      dayId,
      completed: false,
      timeSpent,
    };
  } else {
    module.days[dayId].timeSpent += timeSpent;
  }

  module.totalTimeSpent += timeSpent;
  progress.totalTimeSpent += timeSpent;

  updateActivityLog();
  
  saveProgress(progress);
}

// Update flashcard progress
export function updateFlashcardProgress(
  moduleId: number,
  totalCards: number,
  masteredCards: number,
  reviewedCards: number
): void {
  const progress = getProgress();
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = getEmptyModuleProgress(moduleId, 100);
  }

  progress.modules[moduleId].flashcards = {
    totalCards,
    masteredCards,
    reviewedCards,
    lastReviewDate: new Date().toISOString(),
  };

  recalculateModuleCompletion(moduleId);
  saveProgress(progress);
}

// Update quiz progress
export function updateQuizProgress(
  moduleId: number,
  score: number,
  totalQuizzes: number
): void {
  const progress = getProgress();
  if (!progress.modules[moduleId]) {
    progress.modules[moduleId] = getEmptyModuleProgress(moduleId, 100);
  }

  const quiz = progress.modules[moduleId].quiz;
  quiz.completedQuizzes += 1;
  quiz.totalQuizzes = totalQuizzes;
  
  // Calculate new average score
  const totalScore = quiz.averageScore * (quiz.completedQuizzes - 1) + score;
  quiz.averageScore = totalScore / quiz.completedQuizzes;
  quiz.lastQuizDate = new Date().toISOString();

  recalculateModuleCompletion(moduleId);
  saveProgress(progress);
}

// Recalculate module completion percentage
function recalculateModuleCompletion(moduleId: number): void {
  const progress = getProgress();
  const module = progress.modules[moduleId];
  if (!module) return;

  // Module completion criteria:
  // - 70% weight: Days completed
  // - 20% weight: Flashcards mastered
  // - 10% weight: Quiz average score

  const totalDays = getModuleTotalDays(moduleId);
  const completedDays = Object.values(module.days).filter(d => d.completed).length;
  const daysPercentage = (completedDays / totalDays) * 100;

  const flashcardsPercentage = module.flashcards.totalCards > 0
    ? (module.flashcards.masteredCards / module.flashcards.totalCards) * 100
    : 0;

  const quizPercentage = module.quiz.averageScore;

  module.completionPercentage = Math.round(
    daysPercentage * 0.7 + flashcardsPercentage * 0.2 + quizPercentage * 0.1
  );

  // Check if module is completed
  if (module.completionPercentage >= 80 && !module.completedAt) {
    module.completedAt = new Date().toISOString();
  }

  // Recalculate overall completion
  const allModules = Object.values(progress.modules);
  if (allModules.length > 0) {
    progress.overallCompletionPercentage = Math.round(
      allModules.reduce((sum, m) => sum + m.completionPercentage, 0) / allModules.length
    );
  }
}

// Get total days for a module
function getModuleTotalDays(moduleId: number): number {
  return getModuleDayCount(moduleId);
}

// Update activity log for streak calculation
function updateActivityLog(): void {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const log = getActivityLog();
  
  if (!log.includes(today)) {
    log.push(today);
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(log));
    
    // Recalculate streaks
    calculateStreaks();
  }
}

// Get activity log
function getActivityLog(): string[] {
  const stored = localStorage.getItem(ACTIVITY_LOG_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Calculate current and longest streak
function calculateStreaks(): void {
  const progress = getProgress();
  const log = getActivityLog().sort();
  
  if (log.length === 0) {
    progress.currentStreak = 0;
    progress.longestStreak = 0;
    progress.lastActivityDate = undefined;
    saveProgress(progress);
    return;
  }

  let currentStreak = 1;
  let longestStreak = 1;
  let tempStreak = 1;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Calculate streaks
  for (let i = log.length - 1; i > 0; i--) {
    const current = new Date(log[i]);
    const previous = new Date(log[i - 1]);
    const diffDays = Math.floor((current.getTime() - previous.getTime()) / 86400000);

    if (diffDays === 1) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 1;
    }
  }

  // Calculate current streak (must include today or yesterday)
  const lastActivity = log[log.length - 1];
  if (lastActivity === today || lastActivity === yesterday) {
    currentStreak = 1;
    for (let i = log.length - 1; i > 0; i--) {
      const current = new Date(log[i]);
      const previous = new Date(log[i - 1]);
      const diffDays = Math.floor((current.getTime() - previous.getTime()) / 86400000);
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    currentStreak = 0;
  }

  progress.currentStreak = currentStreak;
  progress.longestStreak = Math.max(longestStreak, currentStreak);
  progress.lastActivityDate = log[log.length - 1];
  
  saveProgress(progress);
}

// Check if module is eligible for certificate
export function isModuleEligibleForCertificate(moduleId: number): boolean {
  const progress = getProgress();
  const module = progress.modules[moduleId];
  
  if (!module) return false;
  
  // Criteria for certificate:
  // - At least 80% completion
  // - At least 50% of flashcards mastered
  // - At least one quiz completed with average score >= 60%
  
  return (
    module.completionPercentage >= 80 &&
    (module.flashcards.totalCards === 0 || 
     (module.flashcards.masteredCards / module.flashcards.totalCards) >= 0.5) &&
    (module.quiz.completedQuizzes === 0 || module.quiz.averageScore >= 60)
  );
}

// Get certificate data for a module
export interface CertificateData {
  moduleId: number;
  moduleName: string;
  completionPercentage: number;
  completedAt: string;
  totalTimeSpent: number;
  daysCompleted: number;
  totalDays: number;
}

export function getCertificateData(moduleId: number): CertificateData | null {
  if (!isModuleEligibleForCertificate(moduleId)) {
    return null;
  }

  const progress = getProgress();
  const module = progress.modules[moduleId];

  const moduleNames: Record<number, string> = {
    1: "Modul 1: Einführung in die Immobilienwirtschaft",
    2: "Modul 2: Immobilienmakler §34c GewO",
    3: "Modul 3: WEG- und Mietverwaltung",
    4: "Modul 4: Gutachten & Sachverständige",
    5: "Modul 5: Darlehensvermittlung §34i GewO",
  };

  const totalDays = getModuleTotalDays(moduleId);
  const completedDays = Object.values(module.days).filter(d => d.completed).length;

  return {
    moduleId,
    moduleName: moduleNames[moduleId] || `Modul ${moduleId}`,
    completionPercentage: module.completionPercentage,
    completedAt: module.completedAt || new Date().toISOString(),
    totalTimeSpent: module.totalTimeSpent,
    daysCompleted: completedDays,
    totalDays,
  };
}

// Reset progress (for testing or user request)
export function resetProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(ACTIVITY_LOG_KEY);
}

// Export progress data as JSON
export function exportProgressData(): string {
  const progress = getProgress();
  return JSON.stringify(progress, null, 2);
}
