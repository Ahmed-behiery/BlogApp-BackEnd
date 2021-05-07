const Joi = require("joi");

module.exports.createBlogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  imageUrl: Joi.string(),
});

module.exports.updateBlogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  imageUrl: Joi.string(),
});
