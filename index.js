require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const logger = require(join(__dirname, "middlewares", "logger"));
const connectToDB = require(join(__dirname, "data", "dbConnection"));
const errorHandler = require(join(__dirname, "middlewares", "errorHandler"));
const articleRouter = require(join(__dirname, "routes", "article.route.js"));
const userRouter = require(join(__dirname, "routes", "user.route"));
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middlewares/verifyJWT");
const setUpAdminUser = require("./utils/setUpAdminUser");
const { NOT_FOUNDED_DATA } = require("./utils/errorsConstants");
// app
const app = express();

// middlewares:
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser());
app.use(logger);

// static roats:
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use("/", express.static(join(__dirname, "views")));
app.use("/public", express.static(join(__dirname, "public")));
app.use("/node_modules", express.static(join(__dirname, "node_modules")));
// routes
app.use("/api/users", userRouter);
app.use("/api/articles",articleRouter);

// not founded route
app.use("*", (req, res)=>
{
    res.status(404).json({status: NOT_FOUNDED_DATA, message: "Not founded route"}).end();
})
// error handler middleware
app.use(errorHandler)

// connect to DB
connectToDB()
.then(()=>
{
    app.listen(process.env.PORT, ()=>
    {
        console.log(`Server runing at port ${process.env.PORT}`);
        setUpAdminUser()
        .then(()=>{console.log("Success setub the admin user.")})
        .catch((e)=>{console.error(`Failed to setub the admin user, because of ${e.message}`)});
    });
})