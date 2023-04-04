const mongoose=require('mongoose');
require('dotenv').config();

const dbconnection = async ()=>{
    try {
     const URL=process.env.url;
     mongoose.set("strictQuery", true);
     await mongoose.connect(URL,{useNewUrlParser:true})
     console.log("Database connect");
    } catch (error) {
     console.log("error while db connection", error.message);
    }
 }

 module.exports = {dbconnection}

 