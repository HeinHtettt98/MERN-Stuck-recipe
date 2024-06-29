const express = require("express");
const errorMiddleweare = require("../middleweare/errorHandalling");
const { body, validationResult } = require("express-validator");
const receipeController = require("../controller/receipeController");
const upload = require("../middleweare/uplode");
const route = express.Router();

const validation = [
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("ingredients").notEmpty().isArray(),
];

route.get("", receipeController.index);

route.get("/:id", receipeController.show);

route.post("", validation, errorMiddleweare, receipeController.create);

route.post("/search", receipeController.search);

route.put("/:id", validation, errorMiddleweare, receipeController.update);

route.post(
  "/:id/uplode",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        // console.log("validate", req.file);
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("Photo must be image");
      }
      return true;
    }),
  ],
  errorMiddleweare,
  receipeController.uplode
);

route.post("/:id/reaction", receipeController.reaction);

route.post("/:id/comment", receipeController.comment);

route.get("/:id/get-comment", receipeController.getComment);

route.post("/:id/unsave", receipeController.unSave);

route.delete("/:id", receipeController.destory);

module.exports = route;

// body('photo').custom((value, { req }) => {
//   if (!req.file) {
//
//     throw new Error("Photo is require");
//   }
//   return true;
//   if (req.file) {
//     if (req.file.mimetype.startsWith('image')) {
//       return true;
//     } else {
//       throw new Error("Photo must be image");
//     }
//   } else {
//     throw new Error("Photo is require");
//   }
// })
