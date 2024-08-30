// var fs = require("fs");

// // Asynchronous - Opening File
// console.log("opening file!");
// fs.open('test.txt', 'r+', function(err, fd) {
// if (err) {
// 	return console.error(err);
// }
// console.log("File open successfully");	 
// });

const fs = require('fs')
const os = require('os')
console.log(os.cpus().length)