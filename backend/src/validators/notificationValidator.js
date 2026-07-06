const { z } = require("zod");

const saveSubscriptionSchema = z.object({
  body: z.object({
    subscription: z.object({
      endpoint: z.string().url("Subscription endpoint must be a valid URL."),
      expirationTime: z.any().optional().nullable(),
      keys: z.object({
        p256dh: z.string().min(1, "p256dh key is required."),
        auth: z.string().min(1, "auth key is required."),
      }),
      deviceName: z.string().optional(),
    }),
  }),
});

module.exports = {
  saveSubscriptionSchema,
};