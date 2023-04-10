const  jwt  = require("jsonwebtoken");
const { mongoose } = require("mongoose");

const userModel = require("../models/userModel");

// const jwt = require('jsonwebtoken')
// const imageModel = require('../models/imageModel')
// const userModel = require('../models/userModel')
// const mongoose = require('mongoose')

// exports.authentication = function(req,res,next){

//     try {
//         let token= req.headers["x-api-key"]
//         if(!token){
//             return res.status(400).send({status:false, message:"token is not present in header"})
//         }
    
//         let decode = jwt.verify(token, 'group2project-5', (err,decode)=>{
//             if(err){
//                 return res.status(401).send({status:false, message:err.message})
//             }
//             else{
//                 req.decode = decode
//                 next()
//             }
//         })
//     }
//     catch (error) {
//         return res.status(500).send({status:false, error:error.message})
//     }

// }

// exports.autherisation = async function(req,res,next){
//     try {
//         let imageId = req.params.imageId
//         if (!mongoose.isValidObjectId(imageId)) {
//             return res.status(400).send({ status: false, message: "Please enter valid imageId in params" })
//           }

//         let checkAuth = await imageModel.findOne({_id: imageId})

//         if(checkAuth.userId != req.decode.userId){
//             return res.status(403).send({status:false, message:"You are not autherised"})
//         }

//         next()
//     }
//     catch (error) {
//         return res.status(500).send({status:false, error:error.message})
//     }
// }







const verifyToken = async (req,res,next)=>{

    try {
        let token = req.headers["authorization"]
     
    if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
    token = token.slice(7, token.length)
    

    // if(!validator.isJWT(token)) return res.status(400).send({status:false,msg:"Token is invalid"})

    if(token){

    jwt.verify(token, "group2project-5",(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyToken", error.message)
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    try {
        verifyToken(req,res,async()=>{
            let userId = req.params.userId;
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
            let findUser = await userModel.findOne({_id:userId})
            // if(!findUser) return res.status(404).send({status:false,message:"User not found"})
            if(req.tokenDetails.userId == userId){
                next()
            }else{
                res.status(403).send({status:false,message:"you are not authorized to perform this task"})
            }
        })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyTokenAndAuthorization", error.message)
    }
}






module.exports = {verifyToken,verifyTokenAndAuthorization}