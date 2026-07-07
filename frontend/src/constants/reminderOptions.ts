export type ReminderOption = {
  label: string;
  value: number;
};

export const reminderOptions: ReminderOption[] = [
  { label: "Every 5 minutes", value: 5 },
  { label: "Every 10 minutes", value: 10 },
  { label: "Every 15 minutes", value: 15 },
  { label: "Every 20 minutes", value: 20 },
  { label: "Every 30 minutes", value: 30 },
  { label: "Every 45 minutes", value: 45 },
  { label: "Every 60 minutes", value: 60 },
];