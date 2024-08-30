const express = require("express");

const router = express.Router();

const {
  handleGetAllUsersByID,
  handleAllPatchUsersById,
  handleAllDeleteUsersById,
  handleAllPostUsers,
  handleAllGetUsers,
} = require("../Controllers/index.js");

// Creating Routes...

router.route("/").get(handleAllGetUsers).post(handleAllPostUsers);

router
  .route("/:id")
  .get(handleGetAllUsersByID)
  .patch(handleAllPatchUsersById)
  .delete(handleAllDeleteUsersById);

module.exports = router;