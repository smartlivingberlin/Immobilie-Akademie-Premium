export interface ContentData {
  title: string;
  theory: string;
  extendedTheory?: string;
  law: string[];
  practice: string;
  task?: string;
  tasks?: Array<{type?: string; question: string; hint?: string}>;
  caseStudy?: string;
  solution?: string;
  type?: string;
  quiz?: Array<{question: string; options: string[]; answer: string; explanation?: string}>;
}

export interface WeekData {
  id: number;
  title: string;
  days: string;
  topics: string[];
  dayRange: [number, number];
}
