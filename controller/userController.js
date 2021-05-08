var bcrypt = require("bcryptjs");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../database/models/userModel");
const Post = require("../database/models/postModel");

module.exports.signup = async (req, res) => {
  try {
    const reqBody = req.body;
    const user = await User.findOne({ email: reqBody.email });
    if (user) {
      throw new Error("User already exist with given email");
    }
    password = await bcrypt.hashSync(reqBody.password, 12);

    const newUser = new User({
      firstName: reqBody.firstName,
      userName: reqBody.userName,
      email: reqBody.email,
      password,
    });
    let result = await newUser.save();
    res.status(200).send(result);
  } catch (error) {
    console.log("Something went wrong: Service: signup:", error);
    throw new Error(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return res.status(404).send("Incorrect Password");
    }

    const token = jwt.sign({ id: user._id }, "my-secret-key", {
      expiresIn: "7d",
    });
    res.status(200).send({ token });
  } catch (error) {
    console.log("Something went wrong: Service: signup:", error);
    return res.status(404).send(error)
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    let userId = req.userData;

    let userPosts = await Post.find({ author: userId.id });
    let userData = await User.find({ _id: userId.id });

    data = {
      userData,
      userPosts,
    };
    res.status(200).send(data);
  } catch (error) {
    console.log("Something went wrong: Service: createProduct:", error);
    throw new Error(error);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updateInfo = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("INVALID_ID");
    }

    password = await bcrypt.hashSync(updateInfo.password, 12);

    let result = await Post.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });

    result.password = password;

    if (!result) {
      return res.status(404).send("User_NOT_FOUND");
    }

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(404).send("Something went wrong ..");
  }
};

module.exports.followUser = async (req, res) => {
  try {
    let userId = req.userData;
    const id = req.params.id;

    let user = await User.findOne({ _id: userId.id });
    let followedUser = await User.findOne({ _id: id });

    if (user.following.includes(id)) {
      const index = user.following.indexOf(id);
      if (index > -1) {
        user.following.splice(index, 1);
        user.save();
        res.status(200).send(user);
      }
    } else {
      user.following.push(id);
      user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send("Something went wrong ..");
  }
};

module.exports.followingPosts = async (req, res) => {
  try {
    let userId = req.userData;

    let userData = await User.findOne({ _id: userId.id });

    const followingPosts = userData.following;
    const allFollowingPosts = await Post.find({
      author: { $in: followingPosts },
    }).populate({
      path: "author",
      select: ["firstName", "userName"],
    });

    res.status(200).send(allFollowingPosts);
  } catch (error) {
    console.log("Something went wrong: Service: createProduct:", error);
    throw new Error(error);
  }
};
