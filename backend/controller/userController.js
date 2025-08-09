const User = require("../model/User");
const mongoose = require("mongoose");
const createToken = require("../helper/CreateToke");
const removeImage = require("../helper/RemoveImage");
const Receipe = require("../model/Receipe");

const userController = {
  me: (req, res) => {
    let { name, photo, _id, createdCount, role } = req.user;
    let userInform = {
      _id,
      name,
      photo: photo || "",
      createdCount: createdCount.length,
      role,
    };
    res.json(userInform);
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      const token = createToken(user._id);
      //  ("object");
      res.cookie("jwt", token);
      res.json({ user, token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  userLogin: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.login(email, password);
      const token = createToken(user._id);
      //  ("object");
      res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        // httpOnly: true,
      });
      let userInform = {
        _id: user._id,
        name: user.name,
        photo: user.photo || "",
        createdCount: user.createdCount.length,
        role: user.role,
      };
      res.json({ user: userInform, token });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 1 });
      res.json({ data: "User Logout" });
    } catch (error) {}
  },

  uplodeProfile: async (req, res) => {
    try {
      let id = req.user.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "not a valid id" });
      }
      let preciousUserInfo = await User.findById(id);
      await removeImage(__dirname + "/../public" + preciousUserInfo.photo);
      let userInform = await User.findByIdAndUpdate(
        id,
        {
          photo: "/" + req.file.filename,
        },
        { new: true, useFindAndModify: false }
      );
      if (!userInform) {
        return res.status(404).json({ error: "Receipe not found" });
      }
      res.json(userInform.photo);
    } catch (e) {
      return res.status(500).json({ error: "Internet Server Error" });
    }
  },

  saved: async (req, res) => {
    const { userId, postId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      const post = await Receipe.findByIdAndUpdate(
        postId,
        { $push: { savedUser: [userId] } },
        { new: true, useFindAndModify: false }
      );
      if (!post) {
        return res.status(404).send("Post not found");
      }
      user.savedPosts.push(postId);
      await user.save();
      res.status(200).json({
        post,
        user,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  getSaved: async (req, res) => {
    const { id } = req.params;
    //  ("object");
    try {
      const user = await User.findById(id).populate("savedPosts");
      if (!user) {
        return res.status(404).send("User not found");
      }
      //  ("ok lar");
      res.status(200).json(user.savedPosts);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  createdCount: async (req, res) => {
    try {
       ("object");
      const userCreated = await User.findById(req.user._id).populate(
        "createdCount"
      );
      if (!userCreated) {
        return res.status(404).send("User not found");
      }
       ("ok lar");
      res.status(200).json(userCreated.createdCount);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = userController;
