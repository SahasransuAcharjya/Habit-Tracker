const prisma = require("../config/db");

const saveUserSubscription = async (userId, subscription) => {
  return prisma.notificationSubscription.upsert({
    where: {
      endpoint: subscription.endpoint,
    },
    update: {
      p256dh: subscription.keys?.p256dh || "",
      auth: subscription.keys?.auth || "",
      isActive: true,
    },
    create: {
      userId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys?.p256dh || "",
      auth: subscription.keys?.auth || "",
      deviceName: subscription.deviceName || "Unknown device",
      isActive: true,
    },
  });
};

const getActiveSubscriptionsByUserId = async (userId) => {
  return prisma.notificationSubscription.findMany({
    where: {
      userId,
      isActive: true,
    },
  });
};

module.exports = {
  saveUserSubscription,
  getActiveSubscriptionsByUserId,
};