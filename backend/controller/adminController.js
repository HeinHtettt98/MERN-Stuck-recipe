const User = require("../model/User");
const mongoose = require("mongoose");
const createToken = require("../helper/CreateToke");
const removeImage = require("../helper/RemoveImage");
const Receipe = require("../model/Receipe");

const adminController = {
  indexUser: async (req, res) => {
    const users = await User.find();
    const onlyUser = users.filter((user) => user.role !== "admin");
    res.status(200).json(onlyUser);
  },
  destoryUser: async (req, res) => {
    let id = req.params.id;
    const users = await User.findByIdAndDelete(id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ms :"User delete successful."});
  },
};

module.exports = adminController;
