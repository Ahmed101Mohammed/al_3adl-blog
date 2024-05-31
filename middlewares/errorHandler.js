const { ERROR } = require("../utils/httpRespondStatus");

const errorHandler = (err, req, res, next)=>
{
    console.log(`Error Logger: name:${err.name} message:${err.message}`);
    const errName = err.name;
    const errMessage = err.message;

    switch(errName)
    {
        default:
            res.status(500).json({status: ERROR, message: errMessage}).end();
    }
}

module.exports = errorHandler;