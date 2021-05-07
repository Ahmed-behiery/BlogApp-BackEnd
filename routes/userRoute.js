const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/userController");
const userSchema = require("../apiSchema/userSchema");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const tokenValidation = require("../middleware/tokenValidate");

userRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

userRouter.post(
  "/login",
  joiSchemaValidation.validateBody(userSchema.loginSchema),
  userController.login
);

userRouter.post(
  "/signup",
  joiSchemaValidation.validateBody(userSchema.signUpSchema),
  userController.signup
);

userRouter.get(
  "/:id",
  tokenValidation.validateToken,
  userController.getUserById
);

userRouter.put(
  "/:id",
  tokenValidation.validateToken,
  userController.updateUser
);

userRouter.get(
  "/follow/:id",
  tokenValidation.validateToken,
  userController.followUser
);

userRouter.get(
  "/following/posts",
  tokenValidation.validateToken,
  userController.followingPosts
);

module.exports = userRouter;
