const express = require("express");
const {isAuth} = require("./../middlewares/auth-middleware");

const router = express.Router();
const {list} = require("../controllers/users");


router.get("/users", isAuth, list)

module.exports = router;