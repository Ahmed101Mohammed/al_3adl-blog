require("dotenv").config();
const BlockedAccessToken = require("../models/blackedAccessToken.model");
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errorsConstants");
const AppError = require("../utils/AppError");
const asyncWrapper = require("../middlewares/asyncWrapper");

const verifyJWT = asyncWrapper(
    async (req, res, next)=>
    {
        const authHeader = req.headers['authorization'];
        if(!authHeader)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "expected 'authorization' header property");
            return next(unauthorized);
        }

        const accessToken = authHeader.split(" ")[1];

        const accessTokenExist = await BlockedAccessToken.findOne({token:accessToken});
        if(accessTokenExist)
        {
            const accessToken = accessTokenExist.token;
            try
            {
                jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS);
            }
            catch(e)
            {
                await BlockedAccessToken.deleteOne({token: accessToken});
            }
            const unauthorized = new AppError(UNAUTHORIZED, "you need to signIn to access this resource")
            return next(unauthorized);
        }

        try
        {
            const accessData = jwt.verify(accessToken, process.env.JWT_SECRET_KEY_ACCESS);
            req.authData = accessData;
        }
        catch(e)
        {
            return next(e)
        }

        next();
    }
);

module.exports = verifyJWT;