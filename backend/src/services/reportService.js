const prisma = require("../config/db");
const { startOfDay, endOfDay } = require("../utils/dateTime");
const {
  calculateCompletionRate,
  calculateDailyScore,
} = require("../utils/scoring");
const { buildDailyReportMessages } = require("../utils/promptBuilder");
const { upsertTodayReport } = require("../repositories/reportRepository");

const getTodayUserReport = async (userId, date = new Date()) => {
  const start = startOfDay(date);

  return prisma.dailyReport.findUnique({
    where: {
      userId_reportDate: {
        userId,
        reportDate: start,
      },
    },
  });
};

const generateTodayUserReport = async (userId, tone = "BALANCED", date = new Date()) => {
  const start = startOfDay(date);
  const end = endOfDay(date);

  const instances = await prisma.taskInstance.findMany({
    where: {
      userId,
      scheduledDate: {
        gte: start,
        lte: end,
      },
    },
  });

  const totalTasks = instances.length;
  const completedTasks = instances.filter(
    (item) => item.status === "COMPLETED"
  ).length;
  const missedTasks = instances.filter(
    (item) => item.status === "MISSED"
  ).length;
  const skippedTasks = instances.filter(
    (item) => item.status === "SKIPPED"
  ).length;

  const completionRate = calculateCompletionRate({
    totalTasks,
    completedTasks,
  });

  const score = calculateDailyScore({
    completedTasks,
    missedTasks,
    skippedTasks,
  });

  const messages = buildDailyReportMessages({
    score,
    completedTasks,
    missedTasks,
    tone,
  });

  return upsertTodayReport(
    userId,
    start,
    {
      userId,
      reportDate: start,
      totalTasks,
      completedTasks,
      missedTasks,
      skippedTasks,
      completionRate,
      score,
      summary: messages.summary,
      praiseMessage: messages.praiseMessage,
      warningMessage: messages.warningMessage,
      motivationMessage: messages.motivationMessage,
      toneUsed: tone,
    },
    {
      totalTasks,
      completedTasks,
      missedTasks,
      skippedTasks,
      completionRate,
      score,
      summary: messages.summary,
      praiseMessage: messages.praiseMessage,
      warningMessage: messages.warningMessage,
      motivationMessage: messages.motivationMessage,
      toneUsed: tone,
    }
  );
};

module.exports = {
  getTodayUserReport,
  generateTodayUserReport,
};