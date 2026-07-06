const calculateCompletionRate = ({
  totalTasks = 0,
  completedTasks = 0,
}) => {
  if (!totalTasks) return 0;
  return Number(((completedTasks / totalTasks) * 100).toFixed(2));
};

const calculateDailyScore = ({
  completedTasks = 0,
  missedTasks = 0,
  skippedTasks = 0,
}) => {
  const rawScore = completedTasks * 20 - missedTasks * 12 - skippedTasks * 5;
  return Math.max(0, Math.min(100, rawScore));
};

module.exports = {
  calculateCompletionRate,
  calculateDailyScore,
};