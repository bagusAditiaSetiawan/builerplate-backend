const express = require("express");
const {json} = require("body-parser");
require("dotenv").config({});

const {db} = require("./config/db");
const app = express();

//midleware
app.use(json());

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
const connectToDB = async () => {
    try{
        await db.authenticate();
        console.log("Database connected");
    }catch(error){
        console.log(`Database not connection ${error}`);
    }
}

connectToDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Running in http://localhost:${PORT}`));