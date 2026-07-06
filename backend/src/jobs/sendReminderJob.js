const prisma = require("../config/db");
const { startOfDay } = require("../utils/dateTime");

const runSendReminderJob = async () => {
  try {
    const today = startOfDay(new Date());

    const pendingInstances = await prisma.taskInstance.findMany({
      where: {
        scheduledDate: today,
        status: "PENDING",
      },
      include: {
        task: true,
        user: true,
      },
    });

    if (pendingInstances.length > 0) {
      await prisma.taskInstance.updateMany({
        where: {
          id: {
            in: pendingInstances.map((item) => item.id),
          },
        },
        data: {
          reminderSentCount: {
            increment: 1,
          },
        },
      });
    }

    return {
      success: true,
      message: "Reminders processed successfully.",
      reminderCount: pendingInstances.length,
    };
  } catch (error) {
    console.error("[JOB] sendReminderJob failed:", error.message);

    return {
      success: false,
      message: "Failed to process reminders.",
      error: error.message,
    };
  }
};

module.exports = {
  runSendReminderJob,
};