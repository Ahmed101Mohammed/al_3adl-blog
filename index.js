require("dotenv").config();
const express = require("express");
const cors = require("cors");

// app
const app = express();

// middlewares:
app.use(cors());

// routes

// error handler middleware

// listen to server
app.listen(process.env.PORT, ()=>
{
    console.log(`Server runing at port ${process.env.PORT}`);
})