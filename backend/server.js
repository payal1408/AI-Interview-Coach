// require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config()
import "dotenv/config";
import app from './src/app.js'
import dataBase from './src/db/db.js'

dataBase();

<<<<<<< HEAD
const port = Number(process.env.PORT);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
=======
app.listen(3000, (req, res) => {
    console.log("Server is runing on the port 3000")
})
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
