/**
 * Google Analytics 4 Hook
 * Automatisches Page-Tracking + Custom Events
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window { gtag?: (...args: any[]) => void; }
}

export function usePageTracking() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location,
      page_title: document.title,
    });
  }, [location]);
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (!window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

// Vordefinierte Events
export const Analytics = {
  // Kauftrichter
  viewCourse: (moduleId: number) => trackEvent('view_item', 'Course', `Modul_${moduleId}`),
  startCheckout: (moduleId: number) => trackEvent('begin_checkout', 'Purchase', `Modul_${moduleId}`, 149),
  completePurchase: (moduleId: number) => trackEvent('purchase', 'Purchase', `Modul_${moduleId}`, 149),
  
  // Lernverhalten
  completeDay: (moduleId: number, day: number) => trackEvent('complete_day', 'Learning', `M${moduleId}_T${day}`),
  startQuiz: (moduleId: number) => trackEvent('start_quiz', 'Exam', `Modul_${moduleId}`),
  completeQuiz: (score: number) => trackEvent('complete_quiz', 'Exam', undefined, score),
  startExam: (moduleId: number) => trackEvent('start_exam', 'Exam', `Modul_${moduleId}`),
  passExam: (moduleId: number, score: number) => trackEvent('pass_exam', 'Exam', `Modul_${moduleId}`, score),
  
  // Engagement
  askAI: (moduleId: number) => trackEvent('ask_ai', 'AI_Tutor', `Modul_${moduleId}`),
  downloadCertificate: (moduleId: number) => trackEvent('download_certificate', 'Certificate', `Modul_${moduleId}`),
  
  // Leads
  startTrial: (moduleInterest: string) => trackEvent('start_trial', 'Lead', moduleInterest),
};
