const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  registerSchema,
  loginSchema,
} = require("../validators/authValidator");

router.post("/register", validateMiddleware(registerSchema), register);
router.post("/login", validateMiddleware(loginSchema), login);
router.get("/me", authMiddleware, getMe);

module.exports = router;