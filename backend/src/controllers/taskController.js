const catchAsync = require("../utils/catchAsync");
const {
  getUserTasks,
  getUserTaskById,
  createUserTask,
  updateUserTask,
  completeUserTask,
  removeUserTask,
} = require("../services/taskService");

const getTasks = catchAsync(async (req, res) => {
  const tasks = await getUserTasks(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Tasks fetched successfully.",
    data: tasks,
  });
});

const getTaskById = catchAsync(async (req, res) => {
  const task = await getUserTaskById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Task fetched successfully.",
    data: task,
  });
});

const createTask = catchAsync(async (req, res) => {
  const task = await createUserTask(req.user.id, req.body);

  return res.status(201).json({
    success: true,
    message: "Task created successfully.",
    data: task,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await updateUserTask(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    data: task,
  });
});

const completeTask = catchAsync(async (req, res) => {
  const task = await completeUserTask(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Task marked as completed successfully.",
    data: task,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const deletedTask = await removeUserTask(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
    data: deletedTask,
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
};