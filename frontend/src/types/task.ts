export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "PENDING" | "DONE" | "MISSED" | "SKIPPED";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  priority?: TaskPriority;
  status?: TaskStatus;
  startTime?: string | null;
  endTime?: string | null;
  reminderInterval?: number | null;
  recurrenceRule?: string | null;
};