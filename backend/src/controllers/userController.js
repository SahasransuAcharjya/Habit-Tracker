const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const {
  findUserById,
  updateUserById,
} = require("../repositories/userRepository");

const getProfile = catchAsync(async (req, res) => {
  const user = await findUserById(req.user.id);

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    data: user,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const allowedUpdates = ["name", "assistantTone"];
  const payload = {};

  for (const key of allowedUpdates) {
    if (typeof req.body[key] !== "undefined") {
      payload[key] = req.body[key];
    }
  }

  const updatedUser = await updateUserById(req.user.id, payload);

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    data: updatedUser,
  });
});

module.exports = {
  getProfile,
  updateProfile,
};