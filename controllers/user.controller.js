const Joi = require("joi");
const { join } = require("node:path");
const fs = require("node:fs");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const User = require("../models/user.model");
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const bcrypt = require("bcrypt");
const { ADMIN } = require("../utils/rolesConstants");
const { UNAUTHORIZED, PERMISSION_ERROR } = require("../utils/errorsConstants");
const AppError = require(join(__dirname, "..", "utils", "AppError"))
const removeImageFromDB = require(join(__dirname, "..", "utils", "removeImageFromDB"));

const getUsers = asyncWrapper(
    async (req, res, next)=>
    {
        const limit = req.query.limit? parseInt(req.query.limit):10;
        const page = req.query.page? parseInt(req.query.page):1;
        const skip = (page - 1) * limit;
        const users = await User.aggregate(
            [
                {
                    $project: 
                    {
                        publishedArticlesSize: {$size: "$publishedArticles"},
                        name: 1,
                        email: 1,
                        role: 1   
                    }
                },
                {
                    $sort: {role: 1}
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            ]
        )
        res.status(200).json({status: SUCCESS, data: {users}}).end();
    }
);

const getUser = asyncWrapper(
    async (req, res, next)=>
    {
        let userId;
        let user;
        if(req.authData.role === ADMIN && req.authData.id === req.params.id)
        {
            userId = req.params.id;
            user = await User.findOne({_id: userId}, {"__v": false, "password": false, "refreshToken": false});
        }
        else
        {
            userId = req.authData.id;
            user = await User.findOne({_id: userId}, {"name":true, "avatar": true, "_id": false});
        }

        
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there is no user with "${userId}" id`);
            return next(notFoundedUser);
        }

        res.status(200).json({status: SUCCESS, data: {user}}).end();
    }
);

const getMyData = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.authData.id;
        const user = await User.findOne({_id: userId}, {"__v": false, "password": false, "refreshToken": false});
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there is no user with "${userId}" id`);
            return next(notFoundedUser);
        }
        res.status(200).json({status: SUCCESS, data: {user}}).end();
    }
)

const updateUser = asyncWrapper(
    async (req, res, next)=>
    {
        const { name, email, password, role } =  req.body;
        const userId = req.params.id;
        if(req.authData.role != ADMIN && userId != req.authData.id)
        {
            const permissionError = new AppError(PERMISSION_ERROR, "you don't have permission to modify user data");
            return next(permissionError);
        }

        const updateDataSchema = Joi.object({
            name: Joi.string().min(5),
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            role: Joi.string().valid('user', 'manager', 'admin')
        })

        const userData = { name, email, password, role };

        let val = await updateDataSchema.validateAsync(userData);
        
        if(password)
        {
            val.password = bcrypt.hash(password, 10);
        }

        const user = await User.findOne({_id: userId});
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there no user with '${userId}' id`);
            return next(notFoundedUser);
        }

        if(val.email)
        {
            const oldUser = await User.findOne({email: val.email}, {"_id": true});
            if(oldUser && oldUser._id != userId)
            {
                const dublicatedData = new AppError("DublicatedData", `user with ${val.email} is already exist`);
                return next(dublicatedData);
            }
        }

        if(req.file)
        {
            val.avatar = req.file.filename;
        }

        if(req.authData.role != ADMIN && val.role)
        {
            val.role = undefined;
            const permissionError = new AppError(PERMISSION_ERROR, "you don't have permission to modify user role");
            return next(permissionError);
        }

        if(val.role === ADMIN)
        {
            const permissionError = new AppError(PERMISSION_ERROR, "you don't have permission to modify to admin role");
            return next(permissionError);
        }

        await User.findByIdAndUpdate(userId, val, {"__v": false, "password": false});
        if(req.file)
        {
            let fileName = user.avatar;
            removeImageFromDB(fileName);
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
        const user = await User.findById(userId);
        if(!user)
        {
            const notFoundedUser = new AppError("NotFoundedData", `there no user with '${userId}' id, to deleted`);
            return next(notFoundedUser);
        }
        await User.findByIdAndDelete({_id: userId}, {"__v": false, "password": false});
        removeImageFromDB(user.avatar);

        res.status(200).json({status: SUCCESS, data: {user: null }}).end();
    }
);

module.exports = {
    getUsers,
    getUser,
    getMyData,
    updateUser,
    deleteUser
}