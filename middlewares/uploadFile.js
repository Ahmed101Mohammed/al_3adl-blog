const {join} = require("node:path");
const multer = require("multer");

const filterImageName = (name) =>
{
    return name.replace(/ /g, "-").replace(/'/g, "-").replace(/\(/g, "-").replace(/\)/g, "-")
                .replace(/\//g, "-").replace(/\{/g, "-").replace(/\}/g, "-").replace(/\[/g, "-")
                .replace(/\]/g, "-").replace(/,/g, "-").replace(/:/g, "-").replace(/;/g, "-")
                .replace(/"/g, "-");
}
function fileFilter(req, file, cb)
{
    const filetype = file.mimetype.split("/")[0];
    console.log({file});
    if(filetype === "image")
    {
        cb(null, true);
    }
    else
    {
        const unValidFile = AppError("ValidationError", "article cover file type should be image/{any}");
        cb(unValidFile, false);
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, join(__dirname, "..", "uploads"));
    },
    filename: function (req, file, cb) {
        const authorId = req.authData.id;
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${authorId}-${filterImageName(file.originalname)}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage, fileFilter })
module.exports = upload;