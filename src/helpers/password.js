const bcrypt = require("bcrypt");

const hashing = async (password) => {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
}


module.exports = {
    hashing
}