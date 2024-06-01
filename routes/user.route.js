const { join } = require("node:path");
const router = require("express").Router();
const { register, sign, logout } = require(join(__dirname, "..", "controllers", "auth.controller"));
const { getUsers, postUser, getUser, updateUser, deleteUser } = require(join(__dirname, "..", "controllers", "user.controller"))

router
    .post("/register", register)
    .post("/sign", sign)
    .post("/logout", logout);

router.route("/")
    .get(getUsers)

router.route("/:id")
    .get(getUser)
    .update(updateUser)
    .delete(deleteUser);

module.exports = router;