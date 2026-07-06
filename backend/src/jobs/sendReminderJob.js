const prisma = require("../config/db");
const { startOfDay } = require("../utils/dateTime");
const { sendPushToManyUsers } = require("../services/notificationService");
const { buildReminderPayload } = require("../utils/reminderPayload");

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

    if (!pendingInstances.length) {
      return {
        success: true,
        message: "No reminders to send.",
        reminderCount: 0,
      };
    }

    const userMap = new Map();

    for (const instance of pendingInstances) {
      if (!userMap.has(instance.userId)) {
        userMap.set(instance.userId, []);
      }
      userMap.get(instance.userId).push(instance);
    }

    const results = [];

    for (const [userId, instances] of userMap.entries()) {
      const payload = buildReminderPayload(instances[0]);
      const sendResult = await sendPushToManyUsers([userId], payload);
      results.push({
        userId,
        count: instances.length,
        sendResult,
      });
    }

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

    return {
      success: true,
      message: "Reminders sent successfully.",
      reminderCount: pendingInstances.length,
      results,
    };
  } catch (error) {
    console.error("[JOB] sendReminderJob failed:", error.message);

    return {
      success: false,
      message: "Failed to send reminders.",
      error: error.message,
    };
  }
};

module.exports = {
  runSendReminderJob,
};