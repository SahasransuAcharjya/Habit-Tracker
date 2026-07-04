const validateMiddleware = (validator) => {
  return (req, res, next) => {
    try {
      if (typeof validator !== "function") {
        return next();
      }

      const result = validator(req);

      if (result && result.success === false) {
        return res.status(400).json({
          success: false,
          message: result.message || "Validation failed.",
          errors: result.errors || [],
        });
      }

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error.",
        error: error.message,
      });
    }
  };
};

module.exports = validateMiddleware;