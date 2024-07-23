const { join } = require("node:path");
const { ERROR, FAIL } = require(join(__dirname, "..", "utils", "httpRespondStatus"));
const { UNAUTHORIZED, DUBLICATED_DATA, NOT_FOUNDED_DATA, VALIDATION_ERROR, PERMISSION_ERROR } = require(join("..", "utils", "errorsConstants"))
const errorHandler = (err, req, res, next)=>
{
    console.log(`Error Logger: name:${err.name} message:${err.message}`);
    const errName = err.name;
    const errMessage = err.message;

    switch(errName)
    {
        case UNAUTHORIZED:
            res.status(401).json({status: FAIL, message: errMessage, errorType: UNAUTHORIZED}).end();
            break;
        case DUBLICATED_DATA:
            res.status(409).json({status: FAIL, message: errMessage, errorType: DUBLICATED_DATA}).end();
            break;
        case NOT_FOUNDED_DATA:
            res.status(404).json({status: FAIL, message: errMessage, errorType: NOT_FOUNDED_DATA}).end();
            break;
        case VALIDATION_ERROR:
            res.status(400).json({status: FAIL, message: errMessage, errorType: VALIDATION_ERROR}).end();
            break;
        case PERMISSION_ERROR:
            res.status(403).json({status: FAIL, message: errMessage, errorType: PERMISSION_ERROR}).end();
            break;
        default:
            res.status(500).json({status: ERROR, message: errMessage, errorType: "ERROR"}).end();
            break;
    }
    next();
}

module.exports = errorHandler;