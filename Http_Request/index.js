// Operating System Method which tell's us about our own system.

// const os = require("os")

// // console.log(os.totalmem())
// // console.log(os.freemem())
// // console.log(os.getPriority())
// // console.log(os.loadavg())
// // console.log(os.networkInterfaces())
// console.log(os.platform())
// console.log(os.release())
// console.log(os.type())
// console.log(os.userInfo())
// console.log(os.version())
// console.log(os.machine())
// console.log(os.uptime())
// console.log(os.tmpdir())
// console.log(os.release())
// console.log(os.homedir())
// console.log(os.endianness())
// // console.log(os.cpus())

// HTTP Request generating..........

// const http = require('http')
// const fs = require('fs')

// // console.log(http)

// const server = http.createServer((req,res)=>{
//     // console.log(req)
//     const log = `${Date.now()} : ${req.url} New Request Created\n`
//     fs.appendFile('Apend.txt',log,(err,data)=>{
//         console.log(data)
//     })
//     res.end("Jai Shree Ram")
// })

// server.listen(8000,()=>{
//     console.log("Server Started.")
// })

// import express from 'express';
// const express = require("express");
// const app = express();
// const port = 3000;
// const fs = require("fs");

// // console.log(app)

// app.get("/", (req, res) => {
//   res.send("Hi This is Ankit Balhara...");
//   fs.appendFile(
//     "Apend.txt",
//     "Hi this is Txt  File content appended.",
//     (res, data) => {
//       console.log(data, res);
//     }
//   );
// });
// app.get('/about',(req,res)=>{
//     res.send("Hi this is Ankit Balhara, Creating some awesome project from copy paste type coder.")
// })

// app.listen(port, () => {
//   console.log("Server Started");
// });
