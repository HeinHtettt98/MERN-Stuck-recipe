const express = require("express");
require("dotenv").config();
const cookieparser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// export my module
const receipeRoute = require("./route/receipeRoute");
const userRoute = require("./route/userRoute");
const adminRoute = require("./route/adminRoute");
const validationMiddleweare = require("./middleweare/validationMiddleweare");
const sentMail = require("./helper/sentMail");

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieparser());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connect");
    app.listen(process.env.PORT, () => {
      console.log("server connecting");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("email");
});

app.use("/user",userRoute);
// app.get("/send-emails", async (req, res) => {
//   sentMail({
//     file: "email",
//     data: {
//       name: "Ko Myo Lin",
//     },
//     from: "haha@gmail.com",
//     to: "komyo@gmail.com",
//     subject: "About GOAT Messi",
//   });
//   return res.send("email already sent");
// });

app.use("/receipe", receipeRoute);
app.use("/admin",validationMiddleweare, adminRoute);

// MongooseServerSelectionError: connect ETIMEDOUT
