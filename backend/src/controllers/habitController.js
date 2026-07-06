const catchAsync = require("../utils/catchAsync");
const {
  getHabitsByUserId,
  createHabitForUser,
  updateHabitForUser,
  deleteHabitForUser,
} = require("../services/habitService");

const getHabits = catchAsync(async (req, res) => {
  const habits = await getHabitsByUserId(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Habits fetched successfully.",
    data: habits,
  });
});

const createHabit = catchAsync(async (req, res) => {
  const habit = await createHabitForUser(req.user.id, req.body);

  return res.status(201).json({
    success: true,
    message: "Habit created successfully.",
    data: habit,
  });
});

const updateHabit = catchAsync(async (req, res) => {
  const habit = await updateHabitForUser(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Habit updated successfully.",
    data: habit,
  });
});

const deleteHabit = catchAsync(async (req, res) => {
  const deletedHabit = await deleteHabitForUser(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Habit deleted successfully.",
    data: deletedHabit,
  });
});

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};