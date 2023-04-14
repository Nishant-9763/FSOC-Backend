const imageModel = require("../models/imageModel")


const checkUser = function(data){
    try {
        return imageModel.find(data)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const createData = function(data){
    try {
        return imageModel.create(data)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const checkAndUpdate = function(data){
    try {
        return imageModel.findOneAndUpdate(data,{isDeleted:true},{new:true})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {checkUser,createData,checkAndUpdate}