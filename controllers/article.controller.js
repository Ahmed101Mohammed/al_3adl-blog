const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const Article = require(join(__dirname, "..", "models", "article.model"));
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const AppError = require(join(__dirname, "..", "utils", "AppError"));
const Joi = require('joi');
const { UNAUTHORIZED, NOT_FOUNDED_DATA } = require("../utils/errorsConstants");
const User = require("../models/user.model");
const { USER } = require("../utils/rolesConstants");

const getAllArticles = asyncWrapper(
    async (req, res, next)=>
    {
        const limit = req.query.limit? req.query.limit:10;
        const page = req.query.page? req.query.page:1;
        const skip = (page - 1) * limit;
        const artciles = await Article.find({}, {"__v": false}).limit(limit).skip(skip);
        res.status(200,).json({status:SUCCESS, data: {articles: artciles}}).end();
    }
)

const postArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.authData.id;
        const user = await User.findById(userId, {"__v": false, "password": false});
        const author = user.name;
        const authorId = user._id;

        const { title, body, category} = req.body;
        const articleData = { title, body, author, authorId,category };
        const schema = Joi.object({
            title: Joi.string().min(7).max(60).required(),
            body: Joi.string().min(200).required(),
            author: Joi.string().required(),
            authorId: Joi.required(),
            category: Joi.string().min(3)
        });

        const value = await schema.validateAsync(articleData);
        if(req.file)
        {
            value.cover = req.file.filename;
        }
        console.log({value})

        const newArticle = new Article(value);
        user.publishedArticles.push({articleId: newArticle._id});
        await newArticle.save();
        await user.save();
        res.status(201).json({status: SUCCESS, data: {article: newArticle}});
    }
)

const getArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const articleId = req.params.id;
        const article = await Article.findOne({_id: articleId}, {"__v": false});
        if(!article)
        {
            const notFoundedArticle = new AppError("NotFoundedData", `there is no article with "${articleId}" id`);
            return next(notFoundedArticle);
        }

        res.status(200).json({status: SUCCESS, data: {article}}).end();
    }
)

const updateArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const articleId = req.params.id;
        let article = await Article.findById(articleId);
        if(!(req.authData.id == article.authorId))
        {
            const unauthorized = new AppError(UNAUTHORIZED, "you don't have permission to modify this article");
            return next(unauthorized);
        }

        const schema = Joi.object({
            title: Joi.string().min(7).max(60),
            body: Joi.string().min(200),
            author: Joi.string(),
            authorId: Joi.string(),
            category: Joi.string().min(3),
            liked: Joi.number().min(0),
            disLike: Joi.number().min(0)
        });

        const value = await schema.validateAsync(req.body);
        if(req.file)
        {
            value.cover = req.file.filename;
        }
        console.log({value});

        article = await Article.findByIdAndUpdate(articleId, value);

        console.log({article});
        if(!article)
        {
            const notFoundedArticle = new AppError(NOT_FOUNDED_DATA, `there is no article with "${articleId}" id to update`);
            return next(notFoundedArticle);
        }

        res.status(200).json({status: SUCCESS, data: null}).end();
    }
)

const deleteArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);
        if(!article)
        {
            const notFoundedData = new AppError(NOT_FOUNDED_DATA, `there is no article with "${articleId}" id to delete`);
            return next(notFoundedData);
        }

        const authorId = req.authData.id;
        if(!(article.authorId == authorId) && (req.role === USER))
        {
            const unauthorized = new AppError(UNAUTHORIZED, "you don't have permission to modify this article");
            return next(unauthorized);
        }

        await Article.findByIdAndDelete(articleId);
        const user = await User.findById(req.authData.id, {"__v":false, "password":false});
        user.publishedArticles = user.publishedArticles.filter((e)=> !(e.articleId == articleId));
        await user.save();
        res.status(200).json({status: SUCCESS, data: null});
    }
)

module.exports = {
    getAllArticles,
    postArticle,
    getArticle,
    updateArticle,
    deleteArticle
}