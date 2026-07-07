export type ToneMode = {
  label: string;
  value: string;
  description: string;
};

export const toneModes: ToneMode[] = [
  {
    label: "Motivational",
    value: "MOTIVATIONAL",
    description: "Encourages you and keeps feedback positive.",
  },
  {
    label: "Balanced",
    value: "BALANCED",
    description: "Mix of honesty, discipline, and motivation.",
  },
  {
    label: "Strict",
    value: "STRICT",
    description: "Direct and disciplined feedback with less softness.",
  },
  {
    label: "Savage",
    value: "SAVAGE",
    description: "Taunts excuses and gives hard reality checks.",
  },
];