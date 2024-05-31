const logger = (req, res, next)=>
{
    console.log(`${req.method} ${req.url} body: ${JSON.stringify(req.body)} query: ${JSON.stringify(req.query)}`);
}

module.exports = logger;