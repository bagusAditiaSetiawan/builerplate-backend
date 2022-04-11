const bcrypt = require("bcrypt");

const hashing = async (password) => {
    const salt = await bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT));
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
}

const comparePassword = async (passwordSyncron, passwordHash) => {
    return await bcrypt.compareSync(passwordSyncron, passwordHash)
}


module.exports = {
    hashing,
    comparePassword
}