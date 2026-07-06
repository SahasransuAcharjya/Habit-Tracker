const cron = require("node-cron");
const {
  runGenerateDailyInstancesJob,
} = require("./generateDailyInstancesJob");
const {
  runGenerateDailyReportJob,
} = require("./generateDailyReportJob");
const {
  runMarkMissedTasksJob,
} = require("./markMissedTasksJob");
const {
  runSendReminderJob,
} = require("./sendReminderJob");

const registerJobs = () => {
  cron.schedule("0 0 * * *", runGenerateDailyInstancesJob);
  cron.schedule("*/15 * * * *", runSendReminderJob);
  cron.schedule("*/10 * * * *", runMarkMissedTasksJob);
  cron.schedule("30 23 * * *", runGenerateDailyReportJob);

  console.log("Cron jobs registered successfully.");
};

module.exports = {
  registerJobs,
};