const { join } = require("node:path");
const { getAllArticles, postArticle, getArticle, updateArticle } = require(join(__dirname, "..", "controllers", "article.controller"));
const router = require("express").Router();
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));
  
router.route("/")
    .get(getAllArticles)
    .post(upload.single("cover"),postArticle)

router.route("/:id")
    .get(getArticle)
    .patch(upload.single("cover"), updateArticle);

module.exports = router;