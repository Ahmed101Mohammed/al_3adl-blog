const { join } = require("node:path");
const router = require("express").Router();
const { register, sign, logout, refreshTokenHandler} = require(join(__dirname, "..", "controllers", "auth.controller"));
const { getUsers, getUser, updateUser, deleteUser, getMyData } = require(join(__dirname, "..", "controllers", "user.controller"));
const verifyJWT = require("../middlewares/verifyJWT");
const authorized = require("../middlewares/authorized");
const upload = require(join(__dirname, "..", "middlewares", "uploadFile"));
const {ADMIN} = require("../utils/rolesConstants");
router
    .post("/register", register)
    .post("/sign", sign)
    .get("/logout", verifyJWT, logout)
    .get("/refreshToken", refreshTokenHandler)
    .get("/me", verifyJWT, getMyData);

router.route("/")
    .get(verifyJWT, authorized(ADMIN),getUsers)

router.route("/:id")
    .get(verifyJWT, getUser)
    .patch(verifyJWT, upload.single("avatar"), updateUser)
    .delete(verifyJWT, deleteUser);

module.exports = router;