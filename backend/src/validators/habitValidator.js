const { z } = require("zod");

const habitFrequencyEnum = z.enum(["DAILY", "WEEKLY"]);

const createHabitSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required."),
    description: z.string().trim().optional().nullable(),
    category: z.string().trim().optional().nullable(),
    frequency: habitFrequencyEnum.optional(),
    targetDays: z.array(z.number().int().min(0).max(6)).optional(),
    reminderTime: z.string().datetime().optional().nullable(),
  }),
});

const updateHabitSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional().nullable(),
    category: z.string().trim().optional().nullable(),
    frequency: habitFrequencyEnum.optional(),
    targetDays: z.array(z.number().int().min(0).max(6)).optional(),
    reminderTime: z.string().datetime().optional().nullable(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().min(1, "Habit id is required."),
  }),
});

const habitIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Habit id is required."),
  }),
});

module.exports = {
  createHabitSchema,
  updateHabitSchema,
  habitIdSchema,
};