const prisma = require("../config/db");

const findTodayReportByUserId = async (userId, reportDate) => {
  return prisma.dailyReport.findUnique({
    where: {
      userId_reportDate: {
        userId,
        reportDate,
      },
    },
  });
};

const createReport = async (data) => {
  return prisma.dailyReport.create({
    data,
  });
};

const upsertTodayReport = async (userId, reportDate, createData, updateData) => {
  return prisma.dailyReport.upsert({
    where: {
      userId_reportDate: {
        userId,
        reportDate,
      },
    },
    create: createData,
    update: updateData,
  });
};

module.exports = {
  findTodayReportByUserId,
  createReport,
  upsertTodayReport,
};