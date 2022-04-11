const express = require("express");
const {body} = require("express-validator");
const router = express.Router();
const {signup, signin} = require("../controllers/users");
const {validation} = require("./../middlewares/validation-middleware");



router.post(
    "/auth/signup",
    body("username").notEmpty().withMessage("Username is not empty"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().isLength({
        min: 8,
        max: 255
    }).withMessage("Password Min 8 Characters"),
    validation,
    signup
);

router.post(
    "/auth/signin",
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").notEmpty().isLength({
        min: 8,
        max: 255
    }).withMessage("Password Min 8 Characters"),
    validation,
    signin,
);

module.exports = router;