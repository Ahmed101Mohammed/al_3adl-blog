const {join} = require("node:path");
const multer = require("multer");

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
        const authorId = req.body.authorId || req.params.id;
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${authorId}-${file.originalname}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage: storage, fileFilter })
module.exports = upload;