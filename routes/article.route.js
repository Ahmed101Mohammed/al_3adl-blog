const { join } = require("node:path");
const verifyJWT = require("../middlewares/verifyJWT");
const { ADMIN, MANAGER } = require("../utils/rolesConstants");
const { postArticle, getArticle, 
        updateArticle, deleteArticle, 
        getAllArticlesOfUser, getAllMyArticles, getAllArticlesSorted, 
        getAllArticlesNumberForUser} = require(join(__dirname, "..", "controllers", "article.controller"));
const router = require("express").Router();
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));
const authorized = require("../middlewares/authorized");
router.route("/")
    .post(verifyJWT, authorized(ADMIN, MANAGER), upload.single("cover"),postArticle)

router.route("/advancedSorted")
    .get(getAllArticlesSorted);

router.route("/user/")
    .get(verifyJWT, getAllMyArticles);
router.route("/user/:id")
    .get(getAllArticlesOfUser);

router.route("/:id")
    .get(getArticle)
    .patch(verifyJWT, authorized(ADMIN, MANAGER), upload.single("cover"), updateArticle)
    .delete(verifyJWT, deleteArticle);

module.exports = router;