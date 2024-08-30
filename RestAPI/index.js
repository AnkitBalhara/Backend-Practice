// We are creating here Some REST API which will be used as Rest full api's.
// We use them in the methods as :-
// GET POST PATCH PUT DELETE.

const express = require("express");
const app = express();
const port = 5000;
const users = require("./MOCK_DATA.json");

app.get("/users", (req, res) => {
  let html = `<ul>
    ${users.map((usersData) => `<li>${usersData.first_name}</li>`).join(" ")}
    </ul>`;
  res.send(html);
});

app.get("/", (req, res) => {
  res.json(users);
});

// One simple method is down side so this is the reason why thebelow routes of get, put and patch are commented these individual are also right and wrong but if we want to have our code shorter for the same route as "/api/users/:id" for all then we need to have------->
// app.route("/api/route/:id").get((req,res)=>{}).put((req,res)=>{}).patch((req,res)=>{})

// app.get('/users/:id',(req,res)=>{
//     let id = Number(req.params.id)
//     // res.send(users[id-1])
//     let result =users.find(user=>user.id===id)
//     res.json(result)
// })

// app.put("/api/users/:id", (req, res) => {
//   return res.json({ Status: "Pending..." });
// });

// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ Status: "Pending..." });
// });

// '/api/users/:id'  This is same route for three:-
// We can merge this=====================
app.route("/api/users/:id")
  .get((req, res) => {
    let id = Number(req.params.id);
    let result = users.find((user) => user.id === id);
    res.json(result);
  })
  .delete((req, res) => {
    let id = Number(req.params.id);
    const indexToRemove = users.findIndex(obj => obj.id === id);
    console.log(indexToRemove)
    if (indexToRemove !== -1) {
      users.splice(indexToRemove, 1);
      return res.json(users)  
    }  
  })
  .patch((req, res) => {
    return res.json({ Status: "Pending..." });
  });

//   MiddleWare:-
// 1)app.use(express.json());
// This is used when in thunder client we give values of Body in JSON
app.use(express.json());

// 2)app.use(express.urlencoded({json:false}))
// This is used when in thunder client we give values of Body in Form-encode
// app.use(express.urlencoded({json:false}))

// Creating our self made Middleware's :-
// When we create our middleware then if we send something as 'req.Name="Ram"' then, this name can be used the code which is written below this line... and the next() is used to send the req to the next route.... If we didn't  write next() then, it will be processing only. To eliminate this case, we need to write Either "next()" or "res.send("Anything")".

// Created  Middleware..
// app.use((req,res,next)=>{
//   // req.Jai="Shree Ram";
//   let date = new Date();
//   fs.appendFile('./Appended.txt',`\n${req.ip} ${date} : ${req.method} : ${req.path} : ${Date.now()}`,(err)=>{
//     console.log("Everything is Okay...")
//   })
//   res.end("Har Har Mahadev....")
//   // next()
// })


// const fs = require("fs")
// // Creating Post API's
// app.post("/api/users/", (req, res) => {
// const newdata = req.body
// users.push({id : users.length+1,...newdata})
// fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
//     console.log("Data Added")
// })
// // console.log(users)
// res.json(newdata)
// // console.log(newdata)
// // console.log(users.length)

// });

// This is Creating Post Request with the Status Code... 
const fs = require("fs")
// Creating Post API's
app.post("/api/users/", (req, res) => {
const newdata = req.body
// console.log(newdata.email)
    // The Below line is all about status code how to send any status code....
    // return res.status(400).json({statusCode:"Bad Request"})

    // Now Creating Status Code if the user doesn't give email or first_name or any other data which is being required. We are creating some validations... with the help of status code...
    if(!newdata.first_name || !newdata.last_name || !newdata.email ||  !newdata.gender || !newdata.job){
      res.status(400).json({Details:"Enter All Details.."})
    }

users.push({id : users.length+1,...newdata})
fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    console.log("Data Added")
})
// console.log(users)
res.json(newdata)
// console.log(newdata)
// console.log(users.length)

});

app.listen(port, () => {
  console.log("Server Started.");
});
