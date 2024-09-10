const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const userModel = require("./Models/user.model");
const postModel = require("./Models/post.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { error } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;

  let alreadyUser = await userModel.findOne({ email });
  if (alreadyUser)
    return res.status(409).send("User with email Already Exists!!!");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        age,
        password: hash,
      });
      console.log(createdUser);
      let token = jwt.sign({ email: email, userId: createdUser._id }, "secret");
      res.cookie("token", token);
      res.redirect("/login");
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  // console.log(user.email);
  if (!user) {
    res.render("noEmail", { errorMessage: "The Email Does not Exist!!!" });
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email, userId: user._id }, "secret");
        res.cookie("token", token);
        res.redirect("profile");
      } else {
        res.send("Password Wrong!!!");
      }
    });
    // res.send(user);
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile");
});
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "")
   { return res.status(409).send("You need to Login first!!!");}
  else {
    let data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
    // console.log(data);
    next();
  }
}

app.listen(PORT, () => {
  console.log("Server Started...");
});
