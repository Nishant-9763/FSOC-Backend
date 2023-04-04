const userModel = require("../models/userModel")


const checkEmail = function(email){
    try {
        return userModel.findOne({email:email})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

const createData = function(data){
    try {
        return userModel.create(data)
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {checkEmail,createData}