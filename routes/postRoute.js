const express = require("express");
const postRouter = express.Router();

const postController = require("../controller/postController");
const blogSchema = require("../apiSchema/blogSchema");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const tokenValidation = require("../middleware/tokenValidate");

postRouter.get(
  "/allPosts",
  tokenValidation.validateToken,
  postController.getAllPosts
);

postRouter.post(
  "/create",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(blogSchema.createBlogSchema),
  postController.createNewPost
);

postRouter.put(
  "/update/:id",
  tokenValidation.validateToken,
  joiSchemaValidation.validateBody(blogSchema.updateBlogSchema),
  postController.updatePost
);

postRouter.get(
  "/:id",
  tokenValidation.validateToken,
  postController.getPostById
);

postRouter.delete(
  "/:id",
  tokenValidation.validateToken,
  postController.deletePost
);

module.exports = postRouter;
