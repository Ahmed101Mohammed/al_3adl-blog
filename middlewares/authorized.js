const AppError = require("../utils/AppError")
const { UNAUTHORIZED } = require("../utils/errorsConstants")

const authorized = (...roles)=>
{
    return (req, res, next)=>
        {
            if(!(roles.includes(req.authData.role)))
            {
                const unauthorized = new AppError(UNAUTHORIZED, "you don't have authorization to access this resource");
                return next(unauthorized);
            }

            next();
        }
}

module.exports = authorized;