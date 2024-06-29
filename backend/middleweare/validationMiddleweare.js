const jwt = require("jsonwebtoken");
const User = require("../model/User");
const validationMiddleweare = function async(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "My12345%", (err, decodedValue) => {
      if (err) {
        res.status(401).json({ message: "token is not valid" });
      } else {
        User.findById(decodedValue.id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    res.status(400).json({ error: "User is unauthorized" });
  }
};
module.exports = validationMiddleweare;
