const mongoose = require("mongoose"); 
const AppError = require("../utils/AppError");

const connectToDB = async()=>
{
    try
    {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Successfully connection to DB");
    }
    catch(e)
    {
        console.log("Failed connection to DB, because of:", e.message);
    }
}

module.exports = connectToDB; 