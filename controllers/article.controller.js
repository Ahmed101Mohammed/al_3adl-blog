const { join } = require("node:path");
const asyncWrapper = require(join(__dirname, "..", "middlewares", "asyncWrapper"));
const Article = require(join(__dirname, "..", "models", "article.model"));
const { SUCCESS } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const AppError = require(join(__dirname, "..", "utils", "AppError"));
const Joi = require('joi');
const { UNAUTHORIZED, NOT_FOUNDED_DATA, DUBLICATED_DATA } = require("../utils/errorsConstants");
const User = require("../models/user.model");
const { USER } = require("../utils/rolesConstants");
const removeImageFromDB = require("../utils/removeImageFromDB");
const { default: mongoose } = require("mongoose");

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

const getAllArticlesSorted = asyncWrapper(
    async (req, res, next)=>
    {
        const limit = req.query.limit? parseInt(req.query.limit):10;
        const page = req.query.page? parseInt(req.query.page):1;
        const skip = (page - 1) * limit;

        if(!req.query.sortType)
        {
            const artciles = await Article.aggregate(
                [
                    {
                        $limit: parseInt(limit)
                    },
                    {
                        $skip: parseInt(skip)
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "authorId",
                            foreignField: "_id",
                            as: "author"
                        }
                    },
                    {
                        $unwind: "$author"
                    },
                    {
                        $project: {
                            title: 1,
                            body: 1,
                            _id: 1,
                            category: 1,
                            date: 1,
                            cover: 1,
                            likesNumber: 1,
                            disLikesNumber: 1,
                            author: {
                                name: "$author.name",
                                avatar: "$author.avatar",
                                authorId: "$author._id"
                            }
                        }
                    },
                ]
            ) 
            res.status(200).json({status:SUCCESS, data: {articles: artciles}}).end();
            return;
        }

        const sort = {
            sortType: req.query.sortType,
            sortDirection: req.query.sortDirection
        }
        const schema = Joi.object({
            sortType: Joi.string().valid('date', 'likesNumber', 'dislikesNumber').required(),
            sortDirection: Joi.number().valid(1, -1).required(),
        })

        const value = await schema.validateAsync(sort);
        const articles = await Article.aggregate(
            [
                {
                    $sort: {[value.sortType]: value.sortDirection}
                },
                {
                    $limit: parseInt(limit)
                },
                {
                    $skip: parseInt(skip)
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                        title: 1,
                        body: 1,
                        _id: 1,
                        category: 1,
                        date: 1,
                        cover: 1,
                        likesNumber: 1,
                        disLikesNumber: 1,
                        author: {
                            name: "$author.name",
                            avatar: "$author.avatar",
                            authorId: "$author._id"
                        }
                    }
                },
            ]
        );
        res.status(200,).json({status:SUCCESS, data: {articles: articles}}).end();
    }
)

const getAllArticlesSortedWithLikes = asyncWrapper(
    async (req, res, next)=>
    {
        const sort = req.query.sort? parseInt(req.query.sort) : -1;
        const limit = req.query.limit? parseInt(req.query.limit):10;
        const page = req.query.page? parseInt(req.query.page):1;
        const skip = (page - 1) * limit;
        const artciles = await Article.find({}, {"__v": false}).sort({"likesNumber": sort}).limit(limit).skip(skip);
        res.status(200,).json({status:SUCCESS, data: {articles: artciles}}).end();
    }
)

const getAllArticlesOfUser = asyncWrapper(
    async (req, res, next)=>
    {
        
        const limit = req.query.limit? req.query.limit:10;
        const page = req.query.page? req.query.page:1;
        const skip = (page - 1) * limit;
        const artciles = await Article.aggregate(
            [
                {
                    $match: {authorId: new mongoose.Types.ObjectId(req.params.id)}
                },
                {
                    $sort: {"date": -1}
                },
                {
                    $limit: parseInt(limit)
                },
                {
                    $skip: parseInt(skip)
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                        title: 1,
                        body: 1,
                        _id: 1,
                        category: 1,
                        date: 1,
                        cover: 1,
                        likesNumber: 1,
                        disLikesNumber: 1,
                        author: {
                            name: "$author.name",
                            avatar: "$author.avatar",
                            authorId: "$author._id"
                        }
                    }
                },
            ]
        );
        //const artciles = await Article.find({authorId: userId}, {"__v": false}).sort({"date": -1}).limit(limit).skip(skip);
        res.status(200,).json({status:SUCCESS, data: {articles: artciles}}).end();
    }
)

const getAllMyArticles = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.authData.id;
        const limit = req.query.limit? req.query.limit:10;
        const page = req.query.page? req.query.page:1;
        const skip = (page - 1) * limit;
        const artciles = await Article.aggregate(
            [
                {
                    $match: {authorId: new mongoose.Types.ObjectId(userId)}
                },
                {
                    $sort: {"date": -1}
                },
                {
                    $limit: parseInt(limit)
                },
                {
                    $skip: parseInt(skip)
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                        title: 1,
                        _id: 1,
                        category: 1,
                        date: 1,
                        likesNumber: 1,
                        disLikesNumber: 1,
                        author: {
                            name: "$author.name",
                            authorId: "$author._id"
                        }
                    }
                }
            ]
        )
        res.status(200,).json({status:SUCCESS, data: {articles: artciles}}).end();
    }
)

const getAllArticlesNumberForUser = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.params.id;
        const articlesNumber = await Article.count({authorId: userId});
        res.status(200,).json({status:SUCCESS, data: {articlesNumber: articlesNumber}}).end();
    }
)

const getArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const articleId = req.params.id;
        const article = await Article.aggregate(
            [
                {
                    $match: {_id: new mongoose.Types.ObjectId(articleId)}
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project: {
                        title: 1,
                        body: 1,
                        _id: 1,
                        category: 1,
                        date: 1,
                        cover: 1,
                        likesNumber: 1,
                        disLikesNumber: 1,
                        author: {
                            name: "$author.name",
                            avatar: "$author.avatar",
                            authorId: "$author._id"
                        }
                    }
                },
            ]
        );
        if(!article)
        {
            const notFoundedArticle = new AppError("NotFoundedData", `there is no article with "${articleId}" id`);
            return next(notFoundedArticle);
        }

        res.status(200).json({status: SUCCESS, data: {article: article[0]}}).end();
    }
)

const postArticle = asyncWrapper(
    async (req, res, next)=>
    {
        const userId = req.authData.id;
        const user = await User.findById(userId, {"__v": false, "password": false});
        const author = user.name;
        const authorId = user._id;
        const authorAvatar = user.avatar;

        const { title, body, category} = req.body;
        const articleData = { title, body, author, authorId, category };
        const schema = Joi.object({
            title: Joi.string().min(7).max(60).required(),
            body: Joi.string().min(200).required(),
            author: Joi.string().required(),
            authorId: Joi.required(),
            category: Joi.string().min(2)
        });

        let value = await schema.validateAsync(articleData);
        value.authorAvatar = authorAvatar;

        if(req.file)
        {
            value.cover = req.file.filename;
        }
        else
        {
            const notFoundedCover = new AppError(NOT_FOUNDED_DATA, "article cover is required");
            return next(notFoundedCover);
        }

        const newArticle = new Article(value);
        user.publishedArticles.push({articleId: newArticle._id});
        
        await newArticle.save();
        await user.save();

        res.status(201).json({status: SUCCESS, data: {article: newArticle}});
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

        let reqData = {title: req.body.title, body: req.body.body, category: req.body.category};
        const schema = Joi.object({
            title: Joi.string().min(7).max(60),
            body: Joi.string().min(200),
            author: Joi.string(),
            authorId: Joi.string(),
            category: Joi.string().min(2),
            liked: Joi.number().min(0),
            disLike: Joi.number().min(0),
        });

        let value = await schema.validateAsync(reqData);

        const artcile = await Article.findById(articleId);
        if(!artcile)
        {
            const notFoundedArticle = new AppError(NOT_FOUNDED_DATA, `there is no article with "${articleId}" id to update`);
            return next(notFoundedArticle);
        }

        if(value.title)
        {
            const articleWithSameTitle = await Article.findOne({title: value.title}, {_id: true});
            if(articleWithSameTitle && articleWithSameTitle._id != articleId)
            {
                const dublicatedTitle = new AppError(DUBLICATED_DATA, `there is already an article with "${value.title}" title`);
                return next(dublicatedTitle);
            }
        }

        if(req.file)
        {
            value.cover = req.file.filename;
        }

        await Article.findByIdAndUpdate(articleId, value);
        if(req.file)
        {
            removeImageFromDB(artcile.cover);
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

        const artcile = await Article.findById(articleId);
        if(!artcile)
        {
            const notFoundedArticle = new AppError(NOT_FOUNDED_DATA, `there is no article with "${articleId}" id to delete`);
            return next(notFoundedArticle);
        }
        
        await Article.findByIdAndDelete(articleId);
        const user = await User.findById(req.authData.id, {"__v":false, "password":false});
        user.publishedArticles = user.publishedArticles.filter((e)=> !(e.articleId == articleId));
        await user.save();
        removeImageFromDB(artcile.cover);
        res.status(200).json({status: SUCCESS, data: null});
    }
)

module.exports = {
    getAllArticles,
    getAllArticlesSortedWithLikes,
    postArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    getAllArticlesOfUser,
    getAllMyArticles,
    getAllArticlesSorted,
    getAllArticlesNumberForUser
}