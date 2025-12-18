export type View = 'landing' | 'onboarding' | 'auth' | 'dashboard' | 'add-words' | 'flashcards' | 'scenario-pick' | 'scenario-play' | 'test' | 'results';

export interface Word {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  mastery: number;
}

export interface UserProfile {
  name: string;
  coins: number;
  streak: number;
  level: number;
  xp: number;
  goal: string;
}

export interface TestQuestion {
  question: string;
  answer: string;
  options: string[];
  type: 'translate';
}

export interface Scenario {
  title: string;
  context: string;
  dialogue: { role: string; text: string; translation: string }[];
  keyVocabulary: { arabic: string; english: string }[];
}