const mongoose = require("mongoose"); 
const AppError = require("../utils/AppError");

const connectToDB = ()=>
{
    mongoose.connect(process.env.MONGO_DB_URI)
    .then(()=>{console.log("Successfully connection to DB");})
    .catch((e)=>{
        console.log("Failed connection to DB, because of:", e.message);
    });
}

module.exports = connectToDB; 