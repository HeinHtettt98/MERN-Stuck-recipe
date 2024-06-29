const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");
const adminAuth = require("../helper/adminAuth")

route.get('',adminAuth,adminController.indexUser)
route.delete('/:id/destory',adminAuth,adminController.destoryUser)


module.exports = route;
