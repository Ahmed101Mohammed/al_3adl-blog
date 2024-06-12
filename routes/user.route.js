const { join } = require("node:path");
const router = require("express").Router();
const { register, sign, logout, refreshTokenHandler } = require(join(__dirname, "..", "controllers", "auth.controller"));
const { getUsers, getUser, updateUser, deleteUser } = require(join(__dirname, "..", "controllers", "user.controller"));
const verifyJWT = require("../middlewares/verifyJWT");
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));

router
    .post("/register", register)
    .post("/sign", sign)
    .post("/logout", logout)
    .get("/refreshToken", refreshTokenHandler);

router.route("/")
    .get(verifyJWT ,getUsers)

router.route("/:id")
    .get(getUser)
    .patch(upload.single("avatar"), updateUser)
    .delete(deleteUser);

module.exports = router;