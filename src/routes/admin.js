const express = require("express");

const router = express.Router();
const {list} = require("../controllers/users");


router.get("/users", list)

module.exports = router;