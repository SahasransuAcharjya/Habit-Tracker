const express = require("express");
const router = express.Router();

const {
  getTodayReport,
  generateTodayReport,
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  generateReportSchema,
} = require("../validators/reportValidator");

router.get("/today", authMiddleware, getTodayReport);
router.post(
  "/generate",
  authMiddleware,
  validateMiddleware(generateReportSchema),
  generateTodayReport
);

module.exports = router;