const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      data: {
        id: req.user?.id || null,
        name: req.user?.name || "Demo User",
        email: req.user?.email || "demo@example.com",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile.",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user profile.",
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};