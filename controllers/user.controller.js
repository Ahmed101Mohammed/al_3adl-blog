const Joi = require("joi");
const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const User = require("../models/user.model");
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const bcrypt = require("bcrypt");
const { ADMIN } = require("../utils/rolesConstants");
const { UNAUTHORIZED } = require("../utils/errorsConstants");
const AppError = require(join(__dirname, "..", "utils", "AppError"))

const getUsers = asyncWrapper(
    async (req, res, next)=>
    {
        const limit = req.query.limit? req.query.limit:10;
        const page = req.query.page? req.query.page:1;
        const skip = (page - 1) * limit;
        const users = await User.find({}, {"__v": false, "password": false}).limit(limit).skip(skip);
        res.status(200).json({status: SUCCESS, data: {users}}).end();
    }
);

const getUser = asyncWrapper(
    async (req, res, next)=>
    {
        if(req.authData.role != ADMIN && req.authData.id != req.params.id)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "you don't have permission to get user data");
            return next(unauthorized);
        }

        const userId = req.params.id;
        const user = await User.findOne({_id: userId}, {"__v": false, "password": false});
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there is no user with "${userId}" id`);
            return next(notFoundedUser);
        }

        res.status(200).json({status: SUCCESS, data: {user}}).end();
    }
);

const updateUser = asyncWrapper(
    async (req, res, next)=>
    {
        const { name, email, password, role } =  req.body;
        const userId = req.params.id;
        if(req.authData.role != ADMIN && userId != req.authData.id)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "you don't have permission to modify user data");
            return next(unauthorized);
        }
        const updateDataSchema = Joi.object({
            name: Joi.string().min(5),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            role: Joi.string().valid('user', 'maniger', 'admin')
        })

        const userData = { name, email, password, role };

        const val = await updateDataSchema.validateAsync(userData);

        if(password)
        {
            val.password = bcrypt.hash(password, 10);
        }

        if(req.file)
        {
            val.avatar = req.file.filename;
        }

        console.log({updateUser: val});
        if(req.authData.role != ADMIN)
        {
            val.role = undefined;
        }

        const user = await User.findByIdAndUpdate(userId, val, {"__v": false, "password": false});
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there no user with '${userId}' id`);
            return next(notFoundedUser);
        }

        res.status(200).json({status: SUCCESS, data: { user: null }});
    }
);

const deleteUser = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.params.id;
        if(req.authData.role != ADMIN && userId != req.authData.id)
        {
            const unauthorized = new AppError(UNAUTHORIZED, "you don't have permission to delete user");
            return next(unauthorized);
        }
        const user = await User.findByIdAndDelete({_id: userId}, {"__v": false, "password": false});
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there no use with '${userId}' id, to deleted`);
            return next(notFoundedUser);
        }

        res.status(200).json({status: SUCCESS, data: {user: null }}).end();
    }
);

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}