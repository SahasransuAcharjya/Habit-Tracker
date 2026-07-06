const prisma = require("../config/db");
const AppError = require("../utils/appError");
const {
  findTasksByUserId,
  findTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../repositories/taskRepository");
const { startOfDay, endOfDay } = require("../utils/dateTime");

const getUserTasks = async (userId) => {
  return findTasksByUserId(userId);
};

const getUserTaskById = async (id, userId) => {
  const task = await findTaskById(id);

  if (!task) {
    throw new AppError("Task not found.", 404);
  }

  if (userId && task.userId !== userId) {
    throw new AppError("You are not allowed to access this task.", 403);
  }

  return task;
};

const createUserTask = async (userId, data) => {
  return createTask({
    userId,
    title: data.title,
    description: data.description || null,
    category: data.category || null,
    type: data.type || "ONE_TIME",
    priority: data.priority || "MEDIUM",
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    startTime: data.startTime ? new Date(data.startTime) : null,
    endTime: data.endTime ? new Date(data.endTime) : null,
    isRecurring: data.isRecurring || false,
    recurrenceDays: data.recurrenceDays || [],
    reminderEnabled:
      typeof data.reminderEnabled === "boolean" ? data.reminderEnabled : true,
    reminderInterval: data.reminderInterval || null,
    autoMarkMissed:
      typeof data.autoMarkMissed === "boolean" ? data.autoMarkMissed : true,
  });
};

const updateUserTask = async (id, userId, data) => {
  await getUserTaskById(id, userId);

  return updateTaskById(id, {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    startTime: data.startTime ? new Date(data.startTime) : undefined,
    endTime: data.endTime ? new Date(data.endTime) : undefined,
  });
};

const getTodayTaskInstance = async (taskId, userId) => {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date());

  const taskInstance = await prisma.taskInstance.findFirst({
    where: {
      taskId,
      userId,
      scheduledDate: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      scheduledDate: "desc",
    },
  });

  return taskInstance;
};

const completeUserTask = async (taskId, userId) => {
  await getUserTaskById(taskId, userId);

  const taskInstance = await getTodayTaskInstance(taskId, userId);

  if (!taskInstance) {
    throw new AppError("No task instance found for today.", 404);
  }

  if (taskInstance.status === "COMPLETED") {
    throw new AppError("Task is already completed for today.", 400);
  }

  if (taskInstance.status === "MISSED") {
    throw new AppError("Task is already marked missed for today.", 400);
  }

  if (taskInstance.status === "SKIPPED") {
    throw new AppError("Task is already skipped for today.", 400);
  }

  return prisma.taskInstance.update({
    where: {
      id: taskInstance.id,
    },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
      missedAt: null,
      skippedAt: null,
      scoreAwarded: 20,
    },
  });
};

const skipUserTask = async (taskId, userId) => {
  await getUserTaskById(taskId, userId);

  const taskInstance = await getTodayTaskInstance(taskId, userId);

  if (!taskInstance) {
    throw new AppError("No task instance found for today.", 404);
  }

  if (taskInstance.status === "COMPLETED") {
    throw new AppError("Completed task cannot be skipped.", 400);
  }

  return prisma.taskInstance.update({
    where: {
      id: taskInstance.id,
    },
    data: {
      status: "SKIPPED",
      skippedAt: new Date(),
      completedAt: null,
      missedAt: null,
      scoreAwarded: 0,
    },
  });
};

const removeUserTask = async (id, userId) => {
  await getUserTaskById(id, userId);

  return deleteTaskById(id);
};

module.exports = {
  getUserTasks,
  getUserTaskById,
  createUserTask,
  updateUserTask,
  completeUserTask,
  skipUserTask,
  removeUserTask,
  getTodayTaskInstance,
};