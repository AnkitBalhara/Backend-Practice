const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");

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
app.use(express.static(path.join(__dirname, "public")));

// Multer Practice............
const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploadfolder/");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
      // console.log(fn)
    });
  },
});

const upload = multer({ storage: storage });

app.get("/multer", (req, res) => {
  res.render("profilepic");
});

app.post(
  "/upload",
  isLoggedIn,
  upload.single("multerfile"),
  async (req, res) => {
    // console.log(req.user)
    // console.log(req.file)
    let user = await userModel.findOne({ email: req.user.email });
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("profile");
  }
);

app.get("/deleteprofile/:filename", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  // console.log(req.params.filename)

  if (user.profilepic == "user.jpg") {
    return res.redirect("/profile");
  } else {
    let filePath = `public/uploadfolder/${req.params.filename}`;
    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error("Error while deleting the file:", err);
        return;
      }
      console.log("File deleted successfully");
      user.profilepic = "user.jpg";
      await user.save();
      res.redirect("/profile");
    });
  }
});

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
  // console.log(user)
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

app.get("/profile", isLoggedIn, async (req, res) => {
  let { email } = req.user;
  let userData = await userModel.findOne({ email }).populate("posts");
  // console.log(userData);
  res.render("profile", { userData: userData });
});

// Middleware Function.........
function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    return res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
    // console.log(data);
    next();
  }
}

app.post("/createpost", isLoggedIn, async (req, res) => {
  let userDetails = jwt.verify(req.cookies.token, "secret");
  // console.log(userDetails,req.body)

  let user = await userModel.findOne({ _id: userDetails.userId });
  // console.log(user)

  let post = await postModel.create({
    user: userDetails._id,
    content: req.body.content,
  });
  // console.log(post)
  user.posts.push(post._id);
  await user.save();

  res.redirect("/profile");
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  // console.log(req.user) || This could come due to the function isLoggedIn...
  let { userId } = req.user;
  // console.log(userId)
  // console.log(req.params.id)
  let post = await postModel.findOne({ _id: req.params.id });
  // console.log(post);

  if (post.likes.indexOf(userId) === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(post.likes.indexOf(userId), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id });
  console.log(post);
  res.render("edit", { post });
});

app.post("/editpost/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

app.get("/delete/:id", isLoggedIn, async (req, res) => {
  let postToDelete = await postModel.findOneAndDelete({ _id: req.params.id });
  // console.log(postToDelete)
  res.redirect("/profile");
});

app.get("/deleteaccount/:email", isLoggedIn, async (req, res) => {
  let user = await userModel.findOneAndDelete({email : req.params.email});
  // console.log(user)
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server Started...");
});
