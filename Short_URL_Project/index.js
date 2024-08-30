
const express = require("express");
const app = express();
const Port = 5001;

// Connection..
const connection = require("./Connection");
connection("mongodb://localhost:27017/Short_URL")
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.log("Error Occurred", err));
// .then(()=>{console.log("MongoDB Connected..")})
// Middleware..
app.use(express.json());

// Routes..
const router = require("./Routes/routes");
app.use("/url", router);

app.listen(Port, () => {
  console.log(`Connected to the Port at : ${Port}`)
});
