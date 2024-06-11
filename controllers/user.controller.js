const Joi = require("joi");
const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const User = require("../models/user.model");
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const bcrypt = require("bcrypt");
const AppError = require(join(__dirname, "..", "utils", "AppError"))

const getUsers = asyncWrapper(
    async (req, res, next)=>
    {
        const users = await User.find({}, {"__v": false, "password": false});
        res.status(200).json({status: SUCCESS, data: {users}}).end();
    }
);

const getUser = asyncWrapper(
    async (req, res, next)=>
    {
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

        console.log({val});
        // if(admin && // check the user role is not admin)
        // {
        //     val.admin = undefined;
        // }

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