// Basically,this is a module. which we can export using the keyword "module.exports" and can have access of other modules using the keyword "require".

// Export method 1:

// function add(a,b){
//     return a+b;
// }

// function sub(a,b){
//     return a-b;
// }

// module.exports={add,sub};

// Export Module 2:

exports.add = (a,b) => a+b;
exports.sub = (a,b) => a-b;
