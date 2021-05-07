const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

const port = 3000;

const cloudinary = require("cloudinary").v2;

const dbConnection = require("./database/connection");

const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");

// Database Connectivity

dbConnection();
  
app.use(cors());

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
