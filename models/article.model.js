const mongoose = require("mongoose");

const userIdSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "required"],
        minLength: [7, "must be more than 6 chars"],
        maxLength: [60, "must be lest than 61 chars"]
    },
    body: {
        type: String,
        require: [true, "required"],
        minLength: [200, "must be more than 199 chars"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String,
        require: [true, "required"]
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        require: [true, "required"]
    },
    cover: {
        type: String,
        default: "article-cover-default.png"
    },
    category: {
        type: String,
        minLength: [2, "name must be more than 2 chars"],
        default: "general"
    },
    liked: {
        type: [userIdSchema]
    },
    disLiked: {
        type: [userIdSchema]
    },
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;