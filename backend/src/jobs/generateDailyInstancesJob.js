const prisma = require("../config/db");
const { startOfDay } = require("../utils/dateTime");

const runGenerateDailyInstancesJob = async () => {
  try {
    const today = startOfDay(new Date());

    const recurringTasks = await prisma.task.findMany({
      where: {
        isActive: true,
        isRecurring: true,
      },
    });

    const existingInstances = await prisma.taskInstance.findMany({
      where: {
        scheduledDate: today,
      },
      select: {
        taskId: true,
      },
    });

    const existingTaskIds = new Set(existingInstances.map((item) => item.taskId));

    const instancesToCreate = recurringTasks
      .filter((task) => !existingTaskIds.has(task.id))
      .map((task) => ({
        userId: task.userId,
        taskId: task.id,
        scheduledDate: today,
        startTime: task.startTime || null,
        endTime: task.endTime || null,
        status: "PENDING",
        reminderSentCount: 0,
        scoreAwarded: 0,
      }));

    if (instancesToCreate.length > 0) {
      await prisma.taskInstance.createMany({
        data: instancesToCreate,
        skipDuplicates: true,
      });
    }

    return {
      success: true,
      message: "Daily task instances generated successfully.",
      createdCount: instancesToCreate.length,
    };
  } catch (error) {
    console.error("[JOB] generateDailyInstancesJob failed:", error.message);

    return {
      success: false,
      message: "Failed to generate daily task instances.",
      error: error.message,
    };
  }
};

module.exports = {
  runGenerateDailyInstancesJob,
};