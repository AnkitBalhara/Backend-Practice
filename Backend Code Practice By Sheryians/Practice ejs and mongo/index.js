const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");
// const mongoose = require('mongoose');
const userModel = require("./models/user.model");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { username, number, email, image } = req.body;
  let createdUser = await userModel.create({
    username,
    number,
    email,
    image,
  });

  res.redirect("/show");
});

app.get("/show", async (req, res) => {
  let allusers = await userModel.find();
  res.render("show", { allusers: allusers });
});

app.get("/delete/:id", async (req, res) => {
  let deleteUser = await userModel.findOneAndDelete({ _id: req.params.id });
  console.log(deleteUser);
  res.redirect("/show");
});

app.get('/update/:id',async (req,res)=>{
    let user = await userModel.find({_id: req.params.id})

    res.render('update',{user:user})
    // console.log(user)
    // res.send("Jai Shree Ram")

})

app.post("/update/:id", async (req, res) => {
  let updateUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {
        username:res.body.username,
        number:res.body.number,
        email:res.body.email,
        image:res.body.image,
    } }
  );
//   console.log(deleteUser)
  res.redirect("/show");
});

app.listen(PORT, () => {
  console.log("Server Started...");
});
