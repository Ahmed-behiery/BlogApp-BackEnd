const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token missing from header");
    }
    const token = req.headers.authorization.split("Bearer")[1].trim();
    const decoded = jwt.verify(token, "my-secret-key");
    req.userData = decoded;
    return next();
  } catch (error) {
    return res.status(400).send("Some thing Went Wrong ..");
  }
};
