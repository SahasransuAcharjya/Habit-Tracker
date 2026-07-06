const AppError = require("../utils/appError");
const {
  findTasksByUserId,
  findTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
} = require("../repositories/taskRepository");

const getUserTasks = async (userId) => {
  return findTasksByUserId(userId);
};

const getUserTaskById = async (id) => {
  const task = await findTaskById(id);

  if (!task) {
    throw new AppError("Task not found.", 404);
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

const updateUserTask = async (id, data) => {
  await getUserTaskById(id);

  return updateTaskById(id, {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    startTime: data.startTime ? new Date(data.startTime) : undefined,
    endTime: data.endTime ? new Date(data.endTime) : undefined,
  });
};

const completeUserTask = async (id) => {
  await getUserTaskById(id);

  return updateTaskById(id, {
    isActive: false,
  });
};

const removeUserTask = async (id) => {
  await getUserTaskById(id);

  return deleteTaskById(id);
};

module.exports = {
  getUserTasks,
  getUserTaskById,
  createUserTask,
  updateUserTask,
  completeUserTask,
  removeUserTask,
};