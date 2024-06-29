const { validationResult } = require("express-validator");

const errorMiddleweare = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({errors : result.mapped()});
  }
  next();
};

module.exports = errorMiddleweare;