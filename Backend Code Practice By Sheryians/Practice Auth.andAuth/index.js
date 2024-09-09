const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const userModel = require("./Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, number } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        number,
      });
      res.send(createdUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    res.send("Something Went Wrong");
  } else {
    if (user.email == req.body.email) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          res.send("Something went wrong...");
        } else {
          let token = jwt.sign({ email: user.email }, "sescret");
          // console.log(token)
          res.cookie("token",token)
          res.send("Logined to the Page");
        }
      });
    }else{
      res.send("Something went wrong...")
    }
  }
});

app.get('/logout',(req,res)=>{
  res.cookie("token","")
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log("Server Started...");
});
