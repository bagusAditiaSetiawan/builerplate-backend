const { User } = require("../models/user");
const {compareToken} = require("./../helpers/jsonwebtoken");
const {errorBuild} = require("./../helpers/rebuild")


const isAuth = async (req, res, next) => {
    if(!req.cookies && !req.cookies.jwt){
        const error = errorBuild("No Authentication");
        return res.status(401).json({
            error,
            message: "No authentication"
        });
    }
    try{
        const isLogin = await compareToken(req.cookies.jwt);
        const user = await User.findOne({
            id: isLogin.id
        });
        req.user = user;
        next();
    }catch(error){        
        const errors = errorBuild(error.name ?? "No Authentication");
        return res.status(401).json({
            errors,
            message: error.name ?? "No Authentication"
        });
    }
}

const isAdmin = async (req, res, next) => {
    if(!req.user || !req.user.isAdmin){
        return res.status(401).json({
            errors: {
                message: "No authentication"
            },
            message: "No authentication"
        });
    }
    next();
}


module.exports = {
    isAuth,
    isAdmin
}