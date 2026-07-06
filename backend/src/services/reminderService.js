const prisma = require("../config/db");
const { isPast } = require("../utils/dateTime");

const getPendingReminderCandidates = async () => {
  const tasks = await prisma.task.findMany({
    where: {
      isActive: true,
      reminderEnabled: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return tasks.filter((task) => {
    if (!task.endTime) return false;
    return !isPast(task.endTime);
  });
};

const markReminderSent = async (taskInstanceId) => {
  return prisma.taskInstance.update({
    where: { id: taskInstanceId },
    data: {
      reminderSentCount: {
        increment: 1,
      },
    },
  });
};

module.exports = {
  getPendingReminderCandidates,
  markReminderSent,
};