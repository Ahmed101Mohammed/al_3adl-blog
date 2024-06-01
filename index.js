require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const logger = require(join(__dirname, "middlewares", "logger"));
const connectToDB = require(join(__dirname, "data", "dbConnection"));
const errorHandler = require(join(__dirname, "middlewares", "errorHandler"));
const articleRouter = require(join(__dirname, "routes", "article.route.js"));
const userRouter = require(join(__dirname, "routes", "user.route"));
// app
const app = express();

// middlewares:
app.use(cors());
app.use(express.json());
app.use(logger);

// static roats:
app.use("/uploads", express.static(join(__dirname, "uploads")));

// routes
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter)

// error handler middleware
app.use(errorHandler)

// listen to server
app.listen(process.env.PORT, ()=>
{
    console.log(`Server runing at port ${process.env.PORT}`);
    connectToDB();
})