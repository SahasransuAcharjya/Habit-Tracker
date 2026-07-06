const prisma = require("../config/db");

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

const updateUserById = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserById,
};