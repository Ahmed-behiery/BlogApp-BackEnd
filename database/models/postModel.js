const mongoose = require("mongoose");
const User = require("../models/userModel");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    imageUrl: {
      type: String,
      default:
        "https://englishlive.ef.com/blog/wp-content/uploads/sites/2/2015/05/improve-written-english.jpg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
