const prisma = require("../config/db");

const getHabitsByUserId = async (userId) => {
  return prisma.habit.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createHabitForUser = async (userId, data) => {
  return prisma.habit.create({
    data: {
      userId,
      title: data.title,
      description: data.description || null,
      category: data.category || null,
      frequency: data.frequency || "DAILY",
      targetDays: data.targetDays || [],
      reminderTime: data.reminderTime ? new Date(data.reminderTime) : null,
    },
  });
};

const updateHabitForUser = async (id, data) => {
  return prisma.habit.update({
    where: { id },
    data: {
      ...data,
      reminderTime: data.reminderTime ? new Date(data.reminderTime) : undefined,
    },
  });
};

const deleteHabitForUser = async (id) => {
  return prisma.habit.delete({
    where: { id },
  });
};

module.exports = {
  getHabitsByUserId,
  createHabitForUser,
  updateHabitForUser,
  deleteHabitForUser,
};