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

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render('show',{filename:req.params.filename,'filedata':filedata})
    })
})

app.post('/create',(req,res)=>{
    let data = req.body;
    // This titleName variable is created for camel case for the title.
    let titleName= data.title.split(' ')[0].toLowerCase() ;
    for (let i = 1; i < data.title.split(' ').length; i++) {
        titleName +=  data.title.split(' ')[i][0].toUpperCase()+data.title.split(' ')[i].slice(1,).toLowerCase()
    }
    fs.writeFile(`./files/${titleName}.txt`,data.details,(err)=>{
        // console.log(err)
        res.redirect('/ejs/fs')
    })
   
})

app.listen(PORT,()=>{
    console.log("Server Started...")
})