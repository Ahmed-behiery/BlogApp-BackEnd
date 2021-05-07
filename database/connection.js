const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Ahmed:747474gh@cluster0.wt8ny.mongodb.net/blogs?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error", error);
    throw new Error(error);
  }
};
