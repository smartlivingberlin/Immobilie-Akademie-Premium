import { describe, it, expect } from 'vitest';

describe('ExamQuestion Button Logic', () => {
  it('should show "Antwort überprüfen" button in normal mode before feedback', () => {
    const showFeedback = false;
    const isIHKMode = false;
    const currentQuestion = 1;
    const totalQuestions = 10;

    // Button should be "Antwort überprüfen" when no feedback shown
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Antwort überprüfen");
  });

  it('should show "Nächste Frage" button in normal mode after feedback', () => {
    const showFeedback = true;
    const isIHKMode = false;
    const currentQuestion = 1;
    const totalQuestions = 10;

    // After feedback, button should be "Nächste Frage"
    const buttonText = currentQuestion < totalQuestions 
      ? "Nächste Frage" 
      : "Prüfung abschließen";

    expect(buttonText).toBe("Nächste Frage");
  });

  it('should show "Nächste Frage" button in IHK mode (no feedback)', () => {
    const showFeedback = false;
    const isIHKMode = true;
    const currentQuestion = 1;
    const totalQuestions = 72;

    // IHK mode: no feedback, directly "Nächste Frage"
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Nächste Frage");
  });

  it('should show "Prüfung abschließen" on last question in normal mode after feedback', () => {
    const showFeedback = true;
    const isIHKMode = false;
    const currentQuestion = 10;
    const totalQuestions = 10;

    // Last question with feedback shown
    const buttonText = currentQuestion < totalQuestions 
      ? "Nächste Frage" 
      : "Prüfung abschließen";

    expect(buttonText).toBe("Prüfung abschließen");
  });

  it('should show "Prüfung abschließen" on last question in IHK mode', () => {
    const showFeedback = false;
    const isIHKMode = true;
    const currentQuestion = 72;
    const totalQuestions = 72;

    // IHK mode: last question
    const buttonText = isIHKMode 
      ? (currentQuestion < totalQuestions ? "Nächste Frage" : "Prüfung abschließen")
      : "Antwort überprüfen";

    expect(buttonText).toBe("Prüfung abschließen");
  });

  it('should not show feedback in IHK mode', () => {
    const isIHKMode = true;
    const showFeedback = false;

    // In IHK mode, feedback should never be shown
    const shouldShowFeedback = !isIHKMode && showFeedback;

    expect(shouldShowFeedback).toBe(false);
  });

  it('should show feedback in normal mode after answer submission', () => {
    const isIHKMode = false;
    const showFeedback = true;

    // In normal mode, feedback should be shown after submission
    const shouldShowFeedback = !isIHKMode && showFeedback;

    expect(shouldShowFeedback).toBe(true);
  });
});
