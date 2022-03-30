const express = require("express");

const router = express.Router();
const {list} = require("./../controllers/products");


router.get("/products", list)

module.exports = router;