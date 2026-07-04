const getHabits = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Habits fetched successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch habits.",
      error: error.message,
    });
  }
};

const createHabit = async (req, res) => {
  try {
    const { title, frequency, targetTime } = req.body;

    return res.status(201).json({
      success: true,
      message: "Habit created successfully.",
      data: {
        title,
        frequency,
        targetTime,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create habit.",
      error: error.message,
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Habit updated successfully.",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update habit.",
      error: error.message,
    });
  }
};

const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Habit deleted successfully.",
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete habit.",
      error: error.message,
    });
  }
};

module.exports = {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
};