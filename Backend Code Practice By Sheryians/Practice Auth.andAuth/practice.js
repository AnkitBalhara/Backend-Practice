const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const PORT = 3000;
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("Name", "Ram");
  res.send("Jai Shree Ram");
});

app.get("/encrypt", (req, res) => {
  // This is the given syantx in docs of npm...
  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //     console.log(salt)
  //     // bcrypt.hash(password, salt, function(err, hash) {
  //     //     // Store hash in your password DB.
  //     // });
  // });

  // This is How it works...

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("password", salt, function (err, hash) {
      console.log(hash);
    });
  });
  // Hash Code Created : $2b$10$3haVOKGOTOJBf3NtEopnHu1F2r1NhvKTVwrNfM4e9Zypvu11l5sDe

  res.send(`Jai Shree Ram Jai Baba Ki`);
});

app.get("/decrypt", (req, res) => {
  bcrypt.compare(
    "password",
    "$2b$10$3haVOKGOTOJBf3NtEopnHu1F2r1NhvKTVwrNfM4e9Zypvu11l5sDe",
    function (err, result) {
      // result == true
      console.log(result);
    }
  );
  res.send(`Jai Shree Ram Jai Baba Ki`);
});

app.get('/jwt',(req,res)=>{
    let token = jwt.sign({email:"JaiShreeRam"},"secret");
    res.cookie("token",token);
    console.log(token)
    res.send(`Jai Shree Ram Jai Baba Ki`);
})

app.get('/jwt2',(req,res)=>{
    let data = jwt.verify(req.cookies.token,"secret")
    console.log(data)
    res.send(`Jai Shree Ram Jai Baba Ki`);
})

app.listen(PORT, () => {
  console.log("Server Started...");
});
