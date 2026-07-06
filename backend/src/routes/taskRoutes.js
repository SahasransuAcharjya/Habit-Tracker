const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  completeTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} = require("../validators/taskValidator");

router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, validateMiddleware(taskIdSchema), getTaskById);
router.post("/", authMiddleware, validateMiddleware(createTaskSchema), createTask);
router.patch("/:id", authMiddleware, validateMiddleware(updateTaskSchema), updateTask);
router.patch("/:id/complete", authMiddleware, validateMiddleware(taskIdSchema), completeTask);
router.delete("/:id", authMiddleware, validateMiddleware(taskIdSchema), deleteTask);

module.exports = router;