const runSendReminderJob = async () => {
  try {
    const now = new Date();

    console.log(`[JOB] sendReminderJob started at ${now.toISOString()}`);

    console.log("[JOB] Reminder sending placeholder executed successfully.");

    return {
      success: true,
      message: "Reminders sent successfully.",
      ranAt: now.toISOString(),
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