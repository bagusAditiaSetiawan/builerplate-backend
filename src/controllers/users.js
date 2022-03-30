const {User} = require("./../models/user");

const list = async(req, res) => {
    const find = await User.getAll();
    res.json({
        data: find,
        message: "Successfully get all users"
    })
}


module.exports = {
    list
}