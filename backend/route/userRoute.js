const express = require("express");
const { body } = require("express-validator");
const route = express.Router();
const upload = require("../middleweare/uplode");
const errorHandaling = require("../middleweare/errorHandalling");
const userController = require("../controller/userController");
const validationMiddleweare = require("../middleweare/validationMiddleweare");

const validation = [
  body("name").notEmpty(),
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
];

route.post("/register", validation, errorHandaling, userController.register);
route.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  errorHandaling,
  userController.userLogin
);

route.get("/me", validationMiddleweare, userController.me);

route.get("/created-item", validationMiddleweare, userController.createdCount);

route.post(
  "/uplodeProfile",
  validationMiddleweare,
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        //  ("validate", req.file);
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("Photo must be image");
      }
      return true;
    }),
  ],
  errorHandaling,
  userController.uplodeProfile
);

route.post("/logout", userController.logout);
route.post("/save-post",validationMiddleweare, userController.saved);
route.get('/:id/saved-posts',validationMiddleweare,userController.getSaved);

module.exports = route;
