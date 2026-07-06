const express = require("express");
const router = express.Router();

const {
  getTodayReport,
  generateTodayReport,
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/today", authMiddleware, getTodayReport);
router.post("/generate", authMiddleware, generateTodayReport);

module.exports = router;