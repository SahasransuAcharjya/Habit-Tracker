const { ZodError } = require("zod");

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      if (validatedData.body) req.body = validatedData.body;
      if (validatedData.params) req.params = validatedData.params;
      if (validatedData.query) req.query = validatedData.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: error.errors.map((item) => ({
            path: item.path.join("."),
            message: item.message,
          })),
        });
      }

      return next(error);
    }
  };
};

module.exports = validateMiddleware;