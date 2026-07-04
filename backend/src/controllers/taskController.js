const getTasks = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks.",
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Task fetched successfully.",
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch task.",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueAt, priority } = req.body;

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: {
        title,
        description,
        dueAt,
        priority,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task.",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update task.",
      error: error.message,
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Task marked as completed successfully.",
      data: {
        id,
        status: "completed",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to complete task.",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete task.",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
};