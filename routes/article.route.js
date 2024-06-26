const { join } = require("node:path");
const verifyJWT = require("../middlewares/verifyJWT");
const { ADMIN } = require("../utils/rolesConstants");
const { getAllArticles, postArticle, getArticle, updateArticle, deleteArticle } = require(join(__dirname, "..", "controllers", "article.controller"));
const router = require("express").Router();
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));
const authorized = require("../middlewares/authorized");
router.route("/")
    .get(getAllArticles)
    .post(verifyJWT, authorized(ADMIN), upload.single("cover"),postArticle)

router.route("/:id")
    .get(getArticle)
    .patch(verifyJWT, authorized(ADMIN), upload.single("cover"), updateArticle)
    .delete(verifyJWT, deleteArticle);

module.exports = router;