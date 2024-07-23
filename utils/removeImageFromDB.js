const fs = require("node:fs");
const {join} = require("node:path");

const removeImageFromDB = (imageName)=>
{
    fs.unlink(join(__dirname, "..", "uploads", imageName), (err)=>
    {
        if(err) throw err;
    })
}

module.exports = removeImageFromDB;