const asyncWrapper = (asyncFunction)=>
{
    return (req, res, next)=>
    {
        asyncFunction(req, res, next).catch((e)=>
        {
            next(e);
        })
    }
}

module.exports = asyncWrapper;