const catchAsync = require("../utils/catchAsync");
const { registerUser, loginUser } = require("../services/authService");

const register = catchAsync(async (req, res) => {
  const { name, email, password, assistantTone } = req.body;

  const result = await registerUser({
    name,
    email,
    password,
    assistantTone,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser({
    email,
    password,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

const getMe = catchAsync(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user fetched successfully.",
    data: req.user,
  });
});

module.exports = {
  register,
  login,
  getMe,
};