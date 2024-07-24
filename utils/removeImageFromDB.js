const fs = require("node:fs");
const {join} = require("node:path");

const removeImageFromDB = (imageName)=>
{
    if(!fs.existsSync(join(__dirname, "..", "uploads", imageName)))
    {
        return false;
    }

    fs.unlink(join(__dirname, "..", "uploads", imageName), (err)=>
    {
        if(err)
        {
            console.log("Remove image from DB failed: ",err.message);
        }
    })
}

module.exports = removeImageFromDB;