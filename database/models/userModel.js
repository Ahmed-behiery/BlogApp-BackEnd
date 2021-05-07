const mongoose = require("mongoose");
const Post = require("../models/postModel");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    userName: String,
    email: String,
    password: String,
    // userPosts: [{type: mongoose.Schema.ObjectId, ref: 'Post' }],
    following: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
