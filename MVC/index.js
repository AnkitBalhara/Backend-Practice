const express = require("express");
const { connectMongoDB } = require("./connection");
const router = require("./Routes/routes");

const app = express();
const port = 5000;
// const model =require('./models')

// Comnnections...
connectMongoDB("mongodb://localhost:27017/MERN_Stack")
  .then(() => {
    console.log("Conneted to MongoDB...");
  })
  .catch((err) => {
    console.log("Error Occured as :-", err);
  });

// Creating Middleware...
app.use(express.json());
// Routes
app.use("/users", router);

app.listen(port, () => console.log("Server Started..."));