const {User} = require("./../models/user");
const jwt = require("jsonwebtoken");

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
            return res.status(400).json({
                errors:[{
                    message: "Username and email already exist"
                }],
                message: "Username and email already exist"
            })
        }

        const signUp = await User.signUp({
            username, email, password
        });
        const token = jwt.sign({ id: signUp.id, email: signUp.email }, process.env.JWT_SECRET);
        return res
            .cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ data: {
                username, email
            }, message: "Successfully signup user" });

        
    }catch(error){
        console.log(error);
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