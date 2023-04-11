const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    prompt :{
        type:String
    },
    imageUrl:{
        type:[String]
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timeseries:true})

module.exports = mongoose.model('image',imageSchema)