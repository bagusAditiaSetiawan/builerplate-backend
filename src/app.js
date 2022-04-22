const express = require("express");
const cookieParser = require("cookie-parser");
const {json} = require("body-parser");
const app = express();

//midleware
app.use(json());
app.use(cookieParser());

//routes
app.use("/admin", require("./routes/admin"));
app.use("/", require("./routes/route"));

//handler error response
app.use("*", (req, res, next) => {
    res.status(404).json({
        errors: [],
        message: "Not Founded"
    });
})

module.exports = app;