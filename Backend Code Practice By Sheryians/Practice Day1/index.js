const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// // console.log(path.join(__dirname,'public'));
// // app.use(express.static('iski jagha pura path aajaye ga')
app.use(express.static(path.join(__dirname,'public')))

// The below line code is for ejs pages..
app.set('view engine','ejs');

// Simple route..
app.get('/',(req,res)=>{
    res.send("Jai Shree Ram")
})
// Dynamic route with Username...
app.get('/profile/:username',(req,res)=>{
    res.send(`Welcome...${req.params.username}`)
})
// Dynamic route with Username and his age...
app.get('/profile/:username/:age',(req,res)=>{
    res.send(`Welcome...${req.params.username} is your age is ${req.params.age} ??`)
})

// Ejs route which could render..
app.get('/ejs',(req,res)=>{
    res.render('index')
})
// Render for fs module to make new file and read that files...
app.get('/ejs/fs',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        // console.log(files)
    res.render('index',{files:files})
    })
})
app.post('/create',(req,res)=>{
    let data = req.body;
    fs.writeFile(`./files/${data.title}.txt`,data.details,(err)=>{
        console.log(err)
    })
    fs.readdir('./files',(err,files)=>{
    res.render('index',{files:files})
    })
})

app.listen(PORT,()=>{
    console.log("Server Started...")
})