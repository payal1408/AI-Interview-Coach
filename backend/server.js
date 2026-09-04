// require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
import "dotenv/config";
import app from './src/app.js'
import dataBase from './src/db/db.js'

dataBase();

const port = Number(process.env.PORT);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
