const buildDailyReportMessages = ({
  score = 0,
  completedTasks = 0,
  missedTasks = 0,
  tone = "BALANCED",
}) => {
  let summary = "Day reviewed.";
  let praiseMessage = "";
  let warningMessage = "";
  let motivationMessage = "";

  if (tone === "MOTIVATIONAL") {
    summary = `You completed ${completedTasks} task(s) today.`;
    praiseMessage =
      score >= 70
        ? "Great effort today. You showed strong consistency."
        : "You still made progress today, and that matters.";
    warningMessage =
      missedTasks > 0
        ? `You missed ${missedTasks} task(s), so there is room to improve.`
        : "You stayed on top of your plan today.";
    motivationMessage = "Show up again tomorrow and push a little harder.";
  }

  if (tone === "BALANCED") {
    summary = `You completed ${completedTasks} task(s) and missed ${missedTasks} task(s).`;
    praiseMessage =
      score >= 70
        ? "You had a productive day overall."
        : "You got some work done, but consistency can improve.";
    warningMessage =
      missedTasks > 0
        ? "Some planned work was left unfinished."
        : "No major misses today.";
    motivationMessage = "Tomorrow should be cleaner and more disciplined.";
  }

  if (tone === "STRICT") {
    summary = `You finished ${completedTasks} and missed ${missedTasks}.`;
    praiseMessage =
      score >= 75
        ? "Good. You followed through on most of your commitments."
        : "You did some work, but not enough to call the day sharp.";
    warningMessage =
      missedTasks > 0
        ? "You ignored parts of the plan and the scoreboard reflects it."
        : "You stayed aligned with your plan today.";
    motivationMessage = "Tomorrow is for execution, not excuses.";
  }

  if (tone === "SAVAGE") {
    summary = `Completed: ${completedTasks}. Missed: ${missedTasks}.`;
    praiseMessage =
      score >= 80
        ? "You actually backed your ambitions with action today."
        : "At least some tasks got done before the excuses took over.";
    warningMessage =
      missedTasks > 0
        ? "You scheduled discipline and delivered delay."
        : "Surprisingly, you did not sabotage the whole plan today.";
    motivationMessage = "Come back tomorrow with proof, not promises.";
  }

  return {
    summary,
    praiseMessage,
    warningMessage,
    motivationMessage,
  };
};

module.exports = {
  buildDailyReportMessages,
};