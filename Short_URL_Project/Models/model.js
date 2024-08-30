const mongoose = require("mongoose");

let ShortURL = new mongoose.Schema(
  {
    ShortedURL: {
      type: String,
      required: true,
      unique:true
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visited: [],
  },
  { timestamps: true }
);

let ShortURL_Model = mongoose.model("Short_URL", ShortURL);

module.exports = ShortURL_Model;
