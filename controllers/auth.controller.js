require("dotenv").config();
const BlockedAccessToken = require("../models/blackedAccessToken.model");
const Joi = require("joi");
const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { UNAUTHORIZED } = require("../utils/errorsConstants");
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const AppError = require(join(__dirname, "..", "utils", "AppError"))
const createJWT = require(join(__dirname, "..", "utils", "createJWT"))
const jwt = require("jsonwebtoken");
const register = asyncWrapper(
    async (req, res, next)=>
    {
        const userRegisterSchema = Joi.object({
            name: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        const { name, email, password } = req.body;

        const userRegisteringData = {name, email, password};

        const val = await userRegisterSchema.validateAsync(userRegisteringData);

        const oldUser = await User.findOne({email});
        if(oldUser)
        {
            const dublicatedData = new AppError("DublicatedData", `user with ${email} is already exist`);
            return next(dublicatedData);
        }

        val.password = await bcrypt.hash(password, 10);
        const newUser = new User(val);
        
        await newUser.save();
        res.status(201).json({status: SUCCESS, data: { user: null }});
    }
)

const sign = asyncWrapper(
    async (req, res, next)=>
    {
        console.log("start sign")
        const userSignSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        const { email, password } = req.body;

        const userSignData = {email, password};
        console.log({userSignData})
        const val = await userSignSchema.validateAsync(userSignData);
        console.log({val});
        const user = await User.findOne({email: email});
        console.log({user});
        if(!user)
        {
            const notFounded = new AppError("NotFoundedData", `no user with ${val.email} email`);
            return next(notFounded);
        }

        const isRightPassword = await bcrypt.compare(val.password, user.password);
        console.log({isRightPassword});
        if(!isRightPassword)
        {
            const unauthorized = new AppError("Unauthorized", "password is wrong");
            return next(unauthorized);
        }

        const accessToken = createJWT(process.env.JWT_SECRET_KEY_ACCESS ,{id: user._id, email: user.email, role: user.role}, "2m");
        const refreshToken = createJWT(process.env.JWT_SECRET_KEY_REFRESH ,{id: user._id, email: user.email, role: user.role}, "1d");

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("jwt", refreshToken, {httpOnly: true, sameSite:"None", secure: true, maxAge: 24 * 60 * 60 * 1000});
        console.log({cookies: JSON.stringify(req.cookies) });
        res.status(200).json({status: SUCCESS, data: {accessToken, userId: user._id}}).end();
    }
);

const logout = asyncWrapper(
    async (req, res, next)=>
    {
        const cookies = req.cookies;
        if(!cookies?.jwt)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "missed data: refresh jwt");
            return next(unauthorized);
        }

        const refreshToken = cookies.jwt;
        const user = await User.findOne({refreshToken}, {"__v": false, "password": false});
        if(!user)
        {
            res.clearCookie("jwt", {httpOnly: true, sameSite:"None", /*secure: true,*/ maxAge: 24*60*60*1000});
            return res.status(204).end();
        }
        user.refreshToken = "";
        await user.save();
        res.clearCookie("jwt", {httpOnly: true, sameSite:"None", /*secure: true,*/ maxAge: 24*60*60*1000});

        // put the logout in black list:
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader.split(" ")[1];
        const newBlockedAccessToken = new BlockedAccessToken({token: accessToken});
        await newBlockedAccessToken.save(); 
        res.status(204).end();
    }

)

const refreshTokenHandler = asyncWrapper(
    async (req, res, next)=>
    {
        const cookies = req.cookies;
        console.log({cookies: JSON.stringify(cookies) });
        if(!cookies?.jwt)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "missed data: refresh jwt");
            return next(unauthorized);
        }

        const refreshToken = cookies.jwt;
        const user = await User.findOne({refreshToken}, {"__v": false, "password": false});
        if(!user)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "invalid refresh token");
            return next(unauthorized);
        }

        console.log({user})
        try
        {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY_REFRESH);
            console.log({decoded});
            const {id, email, role} = decoded; 
            const accessToken = createJWT(process.env.JWT_SECRET_KEY_ACCESS, {id, email, role}, "2m");
            res.status(200).json({status: SUCCESS, data: { accessToken }}).end();
        }
        catch(e)
        {
            return next(e);
        }
    }
)

module.exports = {
    register,
    sign,
    logout,
    refreshTokenHandler
}