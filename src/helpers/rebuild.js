const errorBuild = (errors) => {
    if(typeof errors === "string"){
        return [
            {
                message: errors
            }
        ]
    }
    return errors;
}

module.exports = {
    errorBuild
};