// const mongoose = require("mongoose")
import mongoose from "mongoose";
async function dataBase() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect to database");
    } catch (err) {
        console.log(err)

    }
}


// module.exports = dataBase
export default dataBase