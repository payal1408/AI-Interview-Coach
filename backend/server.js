// require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
import "dotenv/config";
import app from './src/app.js'
import dataBase from './src/db/db.js'

dataBase();

app.listen(3000, (req, res) => {
    console.log("Server is runing on the port 3000")
})