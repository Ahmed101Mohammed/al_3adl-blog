const { join } = require("node:path")
const Joi = require("joi");
const mongoose = require("mongoose");
const { ADMIN, USER, MANIGER } = require(join(__dirname, "..", "utils", "rolesConstants"));

const articleIdSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5
    },
    email: {
        type: String,
        require: [true, "is required"],
        unique: [true, "email already exists"],
        validate: {
            validator: (v)=>
            {
                const schema = Joi.string().email();
                schema.validateAsync(v).then(v=> {return true;}).catch(e=> {return false;})
            },
            message: "not valid"
        }
    },
    password: {
        type: String,
        require: [true, "is required"],
        validate: {
            validator: (v)=>
            {
                const schema = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
                schema.validateAsync(v).then(v=>{return true;}).catch(e=>{return false;});
            }
        }
    },
    role: {
        type: String,
        enum: [ADMIN, USER, MANIGER],
        default: USER
    },
    avatar: {
        type: String,
        default: "person.png"
    },
    avatar100: {
        type: String,
        default: "person-100.png"
    },
    avatar36: {
        type: String,
        default: "person-36.png"
    },
    publishedArticles: [articleIdSchema],
    refreshToken: {
        type: String
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;