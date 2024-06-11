require("dotenv").config();
const jwt = require('jsonwebtoken');

const createJWT = (secretKey ,data, expPeriod)=>
{
    var token = jwt.sign(data, secretKey, {expiresIn: expPeriod});
    return token;
}

module.exports = createJWT;
