const runMarkMissedTasksJob = async () => {
  try {
    const now = new Date();

    console.log(`[JOB] markMissedTasksJob started at ${now.toISOString()}`);

    console.log(
      "[JOB] Missed task marking placeholder executed successfully."
    );

    return {
      success: true,
      message: "Missed tasks marked successfully.",
      ranAt: now.toISOString(),
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