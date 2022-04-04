const {User} = require("./../models/user");

const list = async(req, res) => {
    console.log(req.body)
    const find = await User.getAll();
    res.json({
        data: find,
        message: "Successfully get all users"
    })
}


const signup = async (req, res) => {
    try{
        const signUp = await User.signUp(req.body);
        res.status(201).json({
            data: signUp,
            message: "Successfully user signup"
        })
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