const prisma = require("../config/db");
const { startOfDay } = require("../utils/dateTime");
const {
  generateTodayUserReport,
} = require("../services/reportService");

const runGenerateDailyReportJob = async () => {
  try {
    const today = startOfDay(new Date());

    const users = await prisma.user.findMany({
      select: {
        id: true,
        assistantTone: true,
      },
    });

    let generatedCount = 0;

    for (const user of users) {
      await generateTodayUserReport(user.id, user.assistantTone || "BALANCED", today);
      generatedCount += 1;
    }

    return {
      success: true,
      message: "Daily reports generated successfully.",
      generatedCount,
    };
  } catch (error) {
    console.error("[JOB] generateDailyReportJob failed:", error.message);

    return {
      success: false,
      message: "Failed to generate daily reports.",
      error: error.message,
    };
  }
};

module.exports = {
  runGenerateDailyReportJob,
};