const buildReminderPayload = (taskInstance) => {
  return {
    title: "Activity Assistant Reminder",
    body: `You still have "${taskInstance.task?.title || "a task"}" pending.`,
    url: "/",
    taskInstanceId: taskInstance.id,
    taskId: taskInstance.taskId,
  };
};

module.exports = {
  buildReminderPayload,
};