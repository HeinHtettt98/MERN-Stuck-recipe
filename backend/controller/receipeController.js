const mongoose = require("mongoose");
const Receipe = require("../model/Receipe");
const removeImage = require("../helper/RemoveImage");
const User = require("../model/User");
const emailQueue = require("../queue/emailQueue");

const receipeController = {
  index: async (req, res) => {
    const limit = 4;
    let page = req.query.page || 1;
    let count = await Receipe.countDocuments();
    let countPage = Math.ceil(count / limit);
    const recipes = await Receipe.find()
      .skip((page - 1) * limit)
      .limit(limit);
    // .sort({ createdAt: -1 });
    const pagenation = {
      nextPage: page == countPage ? false : true,
      page,
      count,
    };
    const respon = {
      pagenation,
      recipes,
    };
    setTimeout(() => {
      res.json(respon);
    }, 800);
  },

  search: async (req, res) => {
    try {
      let title = req.query.title;
      if (!title) {
        return res
          .status(400)
          .json({ message: "Title query parameter is required" });
      }
      const recipeSearch = await Receipe.find({
        title: { $regex: title, $options: "i" },
      });
      console.log(recipeSearch);
      if (!recipeSearch) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(recipeSearch);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let eachRecipe = await Receipe.findById(id);
      if (!eachRecipe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(eachRecipe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  create: async (req, res) => {
    try {
      const { title, description, ingredients } = req.body;
      let accUser = req.user;
      const receipe = await Receipe.create({
        title,
        description,
        ingredients,
        createdBy: {
          name: accUser.name,
          image: accUser.photo || "/default.png",
        },
      });
      let created = await User.findByIdAndUpdate(
        accUser._id,
        { $push: { createdCount: [receipe._id] } },
        { new: true, useFindAndModify: false }
      );
      // console.log(receipe);
      let users = await User.find(null, ["email"]);
      let email = users.map((user) => user.email);
      let realityEmail = email.filter((email) => email != accUser.email);
      console.log("body one");
      emailQueue.add({
        file: "email",
        data: {
          name: accUser.name,
          receipe,
        },
        from: accUser.email,
        to: realityEmail,
        subject: "About New Recipe",
      });
      res.json(receipe);
    } catch (e) {
      res.send(e);
    }
  },

  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let eachRecipe = await Receipe.findByIdAndUpdate(id, { ...req.body });
      if (!eachRecipe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(eachRecipe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  reaction: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let eachRecipe = await Receipe.findByIdAndUpdate(
        id,
        {
          $inc: { react: 1 },
        },
        { new: true, useFindAndModify: false }
      );
      if (!eachRecipe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(eachRecipe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  comment: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let eachRecipe = await Receipe.findByIdAndUpdate(
        id,
        { $push: { comment: [req.body] } },
        { new: true, useFindAndModify: false }
      );
      if (!eachRecipe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(eachRecipe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  getComment: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let recipeWithComment = await Receipe.findById(id, null, {
        new: true,
        useFindAndModify: false,
      }).populate("comment.author", "name photo");
      if (!recipeWithComment) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(recipeWithComment.comment);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  unSave: async (req, res) => {
    try {
      let id = req.params.id;
      let userId = req.user._id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let savedUsers = await Receipe.findByIdAndUpdate(id, {
        $pull: { savedUser: userId },
      });
      if (!savedUsers) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      let unSavePost = await User.findByIdAndUpdate(userId, {
        $pull: { savedPosts: id },
      });
      if (!unSavePost) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json({ ok: "ok" });
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  uplode: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let oldRecipes = await Receipe.findById(id);
      await removeImage(__dirname + "/../public" + oldRecipes.photo);
      let eachRecipe = await Receipe.findByIdAndUpdate(id, {
        photo: "/" + req.file.filename,
      });
      if (!eachRecipe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(eachRecipe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  destory: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      const receipeDe = await Receipe.findByIdAndDelete(id);
      if (!receipeDe) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      await removeImage(__dirname + "/../public" + receipeDe.photo);
      res.json(receipeDe);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },
};

module.exports = receipeController;
