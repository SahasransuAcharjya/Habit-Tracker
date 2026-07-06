const express = require("express");
const router = express.Router();

const {
  saveSubscription,
  sendTestNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/subscribe", authMiddleware, saveSubscription);
router.post("/test", authMiddleware, sendTestNotification);

module.exports = router;