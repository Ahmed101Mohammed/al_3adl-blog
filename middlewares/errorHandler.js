const { join } = require("node:path");
const { ERROR, FAIL } = require(join(__dirname, "..", "utils", "httpRespondStatus"));

const errorHandler = (err, req, res, next)=>
{
    console.log(`Error Logger: name:${err.name} message:${err.message}`);
    const errName = err.name;
    const errMessage = err.message;

    switch(errName)
    {
        case "NotFoundedData":
            res.status(404).json({status: FAIL, message: errMessage}).end();
            break;
        case "ValidationError":
            res.status(400).json({status: FAIL, message: errMessage}).end();
            break;
        default:
            res.status(500).json({status: ERROR, message: errMessage}).end();
            break;
    }
    next();
}

module.exports = errorHandler;