const { z } = require("zod");

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("Invalid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    assistantTone: z
      .enum(["MOTIVATIONAL", "BALANCED", "STRICT", "SAVAGE"])
      .optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};