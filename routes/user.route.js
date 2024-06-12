const { join } = require("node:path");
const router = require("express").Router();
const { register, sign, logout, refreshTokenHandler } = require(join(__dirname, "..", "controllers", "auth.controller"));
const { getUsers, getUser, updateUser, deleteUser } = require(join(__dirname, "..", "controllers", "user.controller"));
const verifyJWT = require("../middlewares/verifyJWT");
const authorized = require("../middlewares/authorized");
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));
const {ADMIN, MANIGER} = require("../utils/rolesConstants");
router
    .post("/register", register)
    .post("/sign", sign)
    .post("/logout", verifyJWT, logout)
    .get("/refreshToken", refreshTokenHandler);

router.route("/")
    .get(verifyJWT, authorized(ADMIN, MANIGER),getUsers)

router.route("/:id")
    .get(verifyJWT, getUser)
    .patch(verifyJWT, upload.single("avatar"), updateUser)
    .delete(verifyJWT, deleteUser);

module.exports = router;