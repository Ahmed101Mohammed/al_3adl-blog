const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"],
        minLength: [7, "title must be more than 6 chars"],
        maxLength: [60, "title must be lest than 61 chars"] 
    },
    body: {
        type: String,
        require: [true, "article body is required"],
        minLength: [200, "title must be more than 199 chars"]
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String,
        require: [true, "article must have author"]
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        require: [true, "article must have authorId"]
    },
    cover: {
        type: String,
        default: "article-cover-default.png"
    },
    category: {
        type: String,
        default: "general"
    },
    liked: {
        type: Number,
        default: 0
    },
    disLiked: {
        type: Number, 
        default: 0
    }
})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;