// var fs = require("fs");

// // Asynchronous - Opening File
// console.log("opening file!");
// fs.open('tes.txt', 'a', function(err, fd) {
// if (err) {
// 	return console.error(err);
// }
// console.log("File open successfully");	 
// });

const os = require('os')
console.log(os.cpus().length)