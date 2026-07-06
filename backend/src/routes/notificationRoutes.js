const express = require("express");
const router = express.Router();

const {
  saveSubscription,
  sendTestNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");
const validateMiddleware = require("../middleware/validateMiddleware");
const {
  saveSubscriptionSchema,
} = require("../validators/notificationValidator");

router.post(
  "/subscribe",
  authMiddleware,
  validateMiddleware(saveSubscriptionSchema),
  saveSubscription
);

router.post("/test", authMiddleware, sendTestNotification);

module.exports = router;