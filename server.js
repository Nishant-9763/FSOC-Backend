const express = require("express")
const {dbconnection} = require("./src/db/dbconnect")
const cors =require("cors")
const fileUpload = require("express-fileupload")
const userRoute = require("./src/routes/userRoutes")
const imageRoute = require("./src/routes/imageRoutes")
require('dotenv').config();
const PORT=process.env.PORT ||3001;

// const multer = require("multer")



const app = express()

app.use(express.json())

app.use(cors())
app.use(fileUpload({
  useTempFiles:true
}))
// app.use(multer().any())
//app.use(cors({ origin: '*' }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });

app.use("/user", userRoute)
app.use("/image",imageRoute)


dbconnection()

app.listen(PORT ,()=>{
    console.log(`server start on port ${PORT}`);
})