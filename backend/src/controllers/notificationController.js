const catchAsync = require("../utils/catchAsync");
const {
  saveUserSubscription,
  getActiveSubscriptionsByUserId,
} = require("../services/notificationService");

const saveSubscription = catchAsync(async (req, res) => {
  const { subscription } = req.body;

  const savedSubscription = await saveUserSubscription(
    req.user.id,
    subscription
  );

  return res.status(201).json({
    success: true,
    message: "Notification subscription saved successfully.",
    data: savedSubscription,
  });
});

const sendTestNotification = catchAsync(async (req, res) => {
  const subscriptions = await getActiveSubscriptionsByUserId(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Active notification subscriptions fetched successfully.",
    data: subscriptions,
  });
});

module.exports = {
  saveSubscription,
  sendTestNotification,
};