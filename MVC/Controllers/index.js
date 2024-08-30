const model_usedHere = require("../models/model");

async function handleAllGetUsers(req, res) {
  let allDBUsers = await model_usedHere.find({});
  res.send(allDBUsers);
}

async function handleGetAllUsersByID(req, res) {
  let userFind = await model_usedHere.findById(req.params.id);
  if (!userFind) {
    res.status(400).json({ Error: "Could Not Find" });
  }
  return res.json(userFind);
}

async function handleAllPatchUsersById(req, res) {
  let userFind = await model_usedHere.findByIdAndUpdate(req.params.id, {
    last_name: "Balhara",
  });
  return res.json({ Status: "All Updated" });
}

async function handleAllDeleteUsersById(req, res) {
  let userFind = await model_usedHere.findByIdAndDelete(req.params.id);
  res.send("Deleted Successfully...");
}

async function handleAllPostUsers(req, res) {
  let dataBody = req.body;
  if (
    !dataBody ||
    !dataBody.first_name ||
    !dataBody.last_name ||
    !dataBody.email ||
    !dataBody.gender ||
    !dataBody.job
  ) {
    res.status(400).json({ Details: "All Details are Mandotary..." });
  }
  let result = await model_usedHere.create({
    first_name: dataBody.first_name,
    last_name: dataBody.last_name,
    email: dataBody.email,
    job: dataBody.job,
    gender: dataBody.gender,
  });

  // console.log(result)
  res.status(200).json({ Status: "Everything is Running Smooth..." });
}

module.exports = {
  handleGetAllUsersByID,
  handleAllPatchUsersById,
  handleAllDeleteUsersById,
  handleAllPostUsers,
  handleAllGetUsers,
};
