const express = require("express")
const {dbconnection} = require("./src/db/dbconnect")
const cors =require("cors")
const route = require("./src/routes/userRoutes")
require('dotenv').config();
const PORT=process.env.PORT ||3001;

// const multer = require("multer")



const app = express()

app.use(express.json())

app.use(cors())
// app.use(multer().any())

app.use("/", route)


dbconnection()

app.listen(PORT ,()=>{
    console.log(`server start on port ${PORT}`);
})