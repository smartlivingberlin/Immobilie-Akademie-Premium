export interface ContentData {
  title: string;
  theory: string;
  law: string[];
  practice: string;
  task: string;
  type?: string;
}

export interface WeekData {
  id: number;
  title: string;
  days: string;
  topics: string[];
  dayRange: [number, number];
}
