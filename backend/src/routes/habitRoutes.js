const express = require("express");
const router = express.Router();

const {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  createHabitSchema,
  updateHabitSchema,
  habitIdSchema,
} = require("../validators/habitValidator");

router.get("/", authMiddleware, getHabits);
router.post("/", authMiddleware, validateMiddleware(createHabitSchema), createHabit);
router.patch("/:id", authMiddleware, validateMiddleware(updateHabitSchema), updateHabit);
router.delete("/:id", authMiddleware, validateMiddleware(habitIdSchema), deleteHabit);

module.exports = router;