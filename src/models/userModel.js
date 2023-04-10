const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
name:{
    type:String
}, 
phone_number:{
    type:String
},   
email: { 
    type: String,
     required: true,
      unique: true,
       trim:true
    },
password: { 
    type: String, 
    required: true, 
    trim:true
    }

},{timeStamp:true})


module.exports = mongoose.model("user",userSchema)