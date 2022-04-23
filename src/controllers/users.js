const {User} = require("./../models/user");
const {generateToken} = require("./../helpers/jsonwebtoken");
const {errorBuild} = require("../helpers/rebuild");
const {db} = require("./../config/db");
const mailjet = require("./../helpers/mailjet");
const {stringGenerate} = require("./../helpers/string");

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
        const t = await db.transaction();
        try{
            await t.begin()
            const userExist = await User.userExist({username, email})
            if(userExist){
               throw Error("Username and email already exist");
            }
            const otp = stringGenerate(5);
            const signUp = await User.signUp({
                username, email, password, otp
            });
            const tokenGenerate = await generateToken(signUp.id, signUp.email);

            mailjet.sendMail({
                email: signUp.email,
                name: signUp.email.split("@")[0]
            },{
                subject: "Aktivasi email",
                body: `Kode aktivasi anda adalah <br> <h2>${otp}</h2>`
            });
            await t.commit();
            return res
                .cookie("jwt", tokenGenerate, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                })
                .status(201)
                .json({ data: {
                    username, email
                }, message: "Successfully signup user" });
        }catch(error){
            const errors = errorBuild(error.toString());
            await t.rollback();
            return res.status(400).json({
                errors,
                message: error.toString()
            })
        }
    }catch(error){
        res.status(500).json({
            errors: [],
            message: "Something error"
        })
    }
}

const signin = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const t = await db.transaction();
        try{
            await t.begin()
            const userExist = await User.userExist({username, email})
            if(!userExist){
               throw Error("Username Or email is not exist");
            }
            const isMatch = await User.userPasswordCompare(password, userExist.password);
            if(!isMatch){
                throw Error("Username and password not match")
            }
            const tokenGenerate = await generateToken(userExist.id, userExist.email);
            await t.commit();
            return res
                .cookie("jwt", tokenGenerate, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                .json({ data: {
                    username, email
                }, message: "Successfully signin user" });
        }catch(error){
            const errors = errorBuild(error.toString());
            await t.rollback();
            return res.status(400).json({
                errors,
                message: error.toString()
            })
        }
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
    signin
}