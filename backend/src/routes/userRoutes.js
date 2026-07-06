const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  updateProfileSchema,
} = require("../validators/userValidator");

router.get("/profile", authMiddleware, getProfile);
router.patch(
  "/profile",
  authMiddleware,
  validateMiddleware(updateProfileSchema),
  updateProfile
);

module.exports = router;