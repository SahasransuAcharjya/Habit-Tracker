const { z } = require("zod");

const generateReportSchema = z.object({
  body: z.object({
    tone: z
      .enum(["MOTIVATIONAL", "BALANCED", "STRICT", "SAVAGE"])
      .optional(),
  }),
});

module.exports = {
  generateReportSchema,
};