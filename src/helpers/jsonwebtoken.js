const jwt = require("jsonwebtoken");

const generateToken = async (id, email) => {
    return await jwt.sign({ id, email, iat:  Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) }, process.env.JWT_SECRET, {
        expiresIn: 360,
    });
}

const compareToken = async (token)  => {
    return await jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: `360d`
    });
}


module.exports = {
    generateToken,
    compareToken
}