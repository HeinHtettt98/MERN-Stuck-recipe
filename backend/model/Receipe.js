const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
});

const RecipeSchema = new Schema(
  {
    createdBy: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    react: {
      type: Number,
      default: 0,
    },
    comment: [commentSchema],
    savedUser: [{ type: String}],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
