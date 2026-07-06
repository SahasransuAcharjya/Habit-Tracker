const { z } = require("zod");

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).optional(),
    assistantTone: z
      .enum(["MOTIVATIONAL", "BALANCED", "STRICT", "SAVAGE"])
      .optional(),
  }),
});

module.exports = {
  updateProfileSchema,
};