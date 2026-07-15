export type Habit = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  frequency?: string;
  targetDays?: number[];
  reminderTime?: string | null;
  isActive?: boolean;
};
