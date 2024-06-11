const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    }
});

let BlockedAccessToken = mongoose.model("BlockedAccessToken", schema);
module.exports = BlockedAccessToken;