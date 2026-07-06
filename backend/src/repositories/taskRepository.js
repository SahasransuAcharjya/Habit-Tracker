const prisma = require("../config/db");

const findTasksByUserId = async (userId) => {
  return prisma.task.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

const createTask = async (data) => {
  return prisma.task.create({
    data,
  });
};

const updateTaskById = async (id, data) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

const deleteTaskById = async (id) => {
  return prisma.task.delete({
    where: { id },
  });
};

module.exports = {
  findTasksByUserId,
  findTaskById,
  createTask,
  updateTaskById,
  deleteTaskById,
};