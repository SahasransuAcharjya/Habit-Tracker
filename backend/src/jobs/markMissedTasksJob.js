const prisma = require("../config/db");

const runMarkMissedTasksJob = async () => {
  try {
    const now = new Date();

    const missedInstances = await prisma.taskInstance.updateMany({
      where: {
        status: "PENDING",
        endTime: {
          not: null,
          lt: now,
        },
      },
      data: {
        status: "MISSED",
        missedAt: now,
        scoreAwarded: 0,
      },
    });

    return {
      success: true,
      message: "Missed tasks marked successfully.",
      updatedCount: missedInstances.count,
    };
  } catch (error) {
    console.error("[JOB] markMissedTasksJob failed:", error.message);

    return {
      success: false,
      message: "Failed to mark missed tasks.",
      error: error.message,
    };
  }
};

module.exports = {
  runMarkMissedTasksJob,
};