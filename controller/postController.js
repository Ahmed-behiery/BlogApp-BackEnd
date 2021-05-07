const mongoose = require("mongoose");

const Post = require("../database/models/postModel");
const User = require("../database/models/userModel");
const { cloudinary } = require("../util/cloudinary");

module.exports.getAllPosts = async (req, res) => {
  try {
    userData = req.userData;
    let user = await User.findOne({ _id: userData.id });
    const userFollowing = user.following;
    let allPosts = await Post.find({})
      .populate({
        path: "author",
        select: ["firstName", "userName"],
      })
      .lean();
    for (var i = 0; i < allPosts.length; i++) {
      if (userData.id == allPosts[i].author._id) {
        allPosts[i].mine = true;
      } else {
        if (userFollowing.includes(allPosts[i].author._id)) {
          allPosts[i].follow = true;
        } else {
          allPosts[i].follow = false;
        }
      }
    }

    res.status(200).send(allPosts);
  } catch (error) {
    console.log("Something went wrong: Service: getAllPosts:", error);
    res.send(error);
  }
};

module.exports.createNewPost = async (req, res) => {
  try {
    const fileStr = req.body.imageUrl;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ml_default",
    });

    req.body.imageUrl = uploadResponse.public_id + "." + uploadResponse.format;
    req.body.author = req.userData.id;

    let post = new Post(req.body);

    let result = await post.save();

    res.status(200).send(result);
  } catch (error) {
    console.log("Something went wrong: Service: createProduct:", error);
    // throw new Error(error);
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const updateInfo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("INVALID_ID");
    }

    let result = await Post.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });

    if (!result) {
      res.status(404).send("POST_NOT_FOUND");
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Something went wrong ..");
  }
};

module.exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("INVALID_ID");
    }
    let result = await Post.findById(id);
    if (!result) {
      throw new Error("POST_NOT_FOUND");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Something went wrong ..");
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send("INVALID_ID");
    }

    let result = await Post.findByIdAndDelete(id);
    if (!result) {
      throw new Error("POST_NOT_FOUND");
    }
    res.status(200).send(result);
  } catch (error) {
    console.log("Something went wrong: Service: deleteProduct:", error);
    return res.status(404).send("Something went wrong ..");
  }
};
