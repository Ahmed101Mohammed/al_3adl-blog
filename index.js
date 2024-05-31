require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const connectToDB = require("./data/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
// app
const app = express();

// middlewares:
app.use(cors());
app.use(express.json());
app.use(logger);

// routes

// error handler middleware
app.use(errorHandler)

// listen to server
app.listen(process.env.PORT, ()=>
{
    console.log(`Server runing at port ${process.env.PORT}`);
    connectToDB();
})