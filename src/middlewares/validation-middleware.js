const {validationResult} = require("express-validator");

const validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map((error)=>{
          return {
              message: error.msg,
              param: error.param,
          }
      }), message: "Invalid validation"});
    }
    next();
}







module.exports = {
    validation
};