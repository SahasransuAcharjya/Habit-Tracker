const prisma = require("../config/db");
const webpush = require("../config/webPush");

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

const buildSubscriptionObject = (sub) => ({
  endpoint: sub.endpoint,
  expirationTime: null,
  keys: {
    p256dh: sub.p256dh,
    auth: sub.auth,
  },
});

const sendPushToUser = async (userId, payload) => {
  const subscriptions = await getActiveSubscriptionsByUserId(userId);
  const results = [];

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(
        buildSubscriptionObject(sub),
        JSON.stringify(payload)
      );

      results.push({
        subscriptionId: sub.id,
        success: true,
      });
    } catch (error) {
      if (error.statusCode === 410 || error.statusCode === 404) {
        await prisma.notificationSubscription.update({
          where: { id: sub.id },
          data: { isActive: false },
        });
      }

      results.push({
        subscriptionId: sub.id,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
};

const sendPushToManyUsers = async (userIds, payload) => {
  const results = [];

  for (const userId of userIds) {
    const userResults = await sendPushToUser(userId, payload);
    results.push({
      userId,
      results: userResults,
    });
  }

  return results;
};

module.exports = {
  saveUserSubscription,
  getActiveSubscriptionsByUserId,
  sendPushToUser,
  sendPushToManyUsers,
};