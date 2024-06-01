require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errorsConstants");
const AppError = require(join(__dirname, "..", "utils", "AppError"));
const verifyJWT = (req, res, next)=>
{
    const authHeader = req.headers['authorization'];
    if(!authHeader)
    {
        const unauthorized = new AppError(UNAUTHORIZED, "expected 'authorization' header property");
        return next(unauthorized);
    }

    const accessToken = authHeader.split(" ")[1];
    try
    {
        const accessData = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS);
        req.authData = accessData;
    }
    catch(e)
    {
        return next(e.message)
    }
}

module.exports = verifyJWT;