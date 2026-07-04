const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    return res.status(201).json({
      success: true,
      message: "Register controller reached successfully.",
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email } = req.body;

    return res.status(200).json({
      success: true,
      message: "Login controller reached successfully.",
      data: {
        email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login user.",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Current user fetched successfully.",
      data: req.user || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch current user.",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};