const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {ADMIN} = require("../utils/rolesConstants");

require("dotenv").config();

const setUpAdminUser = async()=>
{
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminUser = await User.findOne({role: ADMIN}, {"__v": false, "password": false});
    if(adminUser)
    {
        return;
    }
    try
    {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const newUser = new User({name: adminName, email: adminEmail, password: hashedPassword, role: ADMIN});
        await newUser.save();
    }
    catch(e)
    {
        console.error(`Problem with hashing user password, because of ${e.message}`)
    }
    
}

module.exports = setUpAdminUser;