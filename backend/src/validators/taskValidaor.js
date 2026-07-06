const { z } = require("zod");

const taskTypeEnum = z.enum(["ONE_TIME", "RECURRING"]);
const taskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, "Title is required."),
    description: z.string().trim().optional().nullable(),
    category: z.string().trim().optional().nullable(),
    type: taskTypeEnum.optional(),
    priority: taskPriorityEnum.optional(),
    dueDate: z.string().datetime().optional().nullable(),
    startTime: z.string().datetime().optional().nullable(),
    endTime: z.string().datetime().optional().nullable(),
    isRecurring: z.boolean().optional(),
    recurrenceDays: z.array(z.number().int().min(0).max(6)).optional(),
    reminderEnabled: z.boolean().optional(),
    reminderInterval: z.number().int().positive().optional().nullable(),
    autoMarkMissed: z.boolean().optional(),
  }),
});

const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).optional(),
    description: z.string().trim().optional().nullable(),
    category: z.string().trim().optional().nullable(),
    type: taskTypeEnum.optional(),
    priority: taskPriorityEnum.optional(),
    dueDate: z.string().datetime().optional().nullable(),
    startTime: z.string().datetime().optional().nullable(),
    endTime: z.string().datetime().optional().nullable(),
    isRecurring: z.boolean().optional(),
    recurrenceDays: z.array(z.number().int().min(0).max(6)).optional(),
    reminderEnabled: z.boolean().optional(),
    reminderInterval: z.number().int().positive().optional().nullable(),
    autoMarkMissed: z.boolean().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().min(1, "Task id is required."),
  }),
});

const taskIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task id is required."),
  }),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
};