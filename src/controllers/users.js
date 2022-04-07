const {User} = require("./../models/user");
const {generateToken} = require("./../helpers/jsonwebtoken");
const { errorBuild } = require("../helpers/rebuild");

const list = async(req, res) => {
    const find = await User.getAll();
    res.json({
        data: find,
        message: "Successfully get all users"
    })
}


const signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const userExist = await User.userExist({username, email})
        if(userExist){
            const errors = errorBuild("Username and email already exist");
            return res.status(400).json({
                errors,
                message: "Username and email already exist"
            })
        }

        const signUp = await User.signUp({
            username, email, password
        });
        const tokenGenerate = await generateToken(signUp.id, signUp.email);
        return res
            .cookie("jwt", tokenGenerate, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ data: {
                username, email
            }, message: "Successfully signup user" });

        
    }catch(error){
        res.status(500).json({
            errors: [],
            message: "Something error"
        })
    }
   
}


module.exports = {
    list, 
    signup,
}