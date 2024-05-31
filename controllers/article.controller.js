const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const Article = require(join(__dirname, "..", "models", "article.model"));
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const AppError = require(join(__dirname, "..", "utils", "AppError"));
const Joi = require('joi');

const getAllArticles = asyncWrapper(
    async (req, res, next)=>
    {
        const artciles = await Article.find({}, {"__v": false});
        res.status(200,).json({status:SUCCESS, data: {articles: artciles}}).end();
    }
)

const postArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const { title, body, author, authorId, category } = req.body;
        const articleData = { title, body, author, authorId, category };
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
        await newArticle.save();
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

        const articleId = req.params.id;
        const article = await Article.findByIdAndUpdate(articleId, value);
        console.log({article});
        if(!article)
        {
            const notFoundedArticle = new AppError("NotFoundedData", `there is no article with "${articleId}" id to update`);
            return next(notFoundedArticle);
        }

        res.status(200).json({status: SUCCESS, data: null}).end();
    }
)

module.exports = {
    getAllArticles,
    postArticle,
    getArticle,
    updateArticle
}