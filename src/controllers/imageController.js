const imageModel = require("../models/imageModel")
const mongoose = require("mongoose")
const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require('cloudinary').v2;




  // Configuration  of "Cloudinary" //
  cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });


  // Configuration of "openAi" //
  const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

  


  const generateImage = async function(req,res){
    try {

     const {userId} = req.params
        const {prompt} = req.body
// taking prompt from user and convert that into image using "openai.createImage" //
        const aiResponse = await openai.createImage({
            prompt:prompt,
            n:1,
            size:'512x512',
            response_format:'url'
        })
// destructuring url from "aiResponse"    //    
        const image = aiResponse.data.data[0].url
        

// storing url into cloudinary storage  //
        const cloudUrl =  await cloudinary.uploader.upload(image,{public_id: Date.now()})  
// taking back stored address from cloudinary //         
        const {secure_url} = cloudUrl

       
 // storing data into PostModel //   
        // console.log(req.decode.userId);
       let postDetails = {userId:userId,prompt,imageUrl:secure_url}   
       let finalData = await imageModel.create(postDetails)
       

      return  res.send({isSuccess: true,message: "Successfully uploaded image.",data:finalData})


    } catch (error) {
        console.log("error from generateImage",error);
      return  res.status(500).send({status:false,Message:"This request is not available yet",error:error.message})
    }
  }



  const getAllImage = async function(req,res){
    const {userId} = req.params
    const finalData = await imageModel.find({userId:userId,isDeleted:false})
    return res.send({status:true,data:finalData})
    }


  const deleteImage = async function(req,res){
    const {userId,imageId} = req.params
    if(!mongoose.isValidObjectId(userId))return res.send("userId is not valid")
    if(!mongoose.isValidObjectId(imageId))return res.send("imageId is not valid")

    const finalData = await imageModel.findOneAndUpdate({_id:imageId,userId:userId,isDeleted:false},{isDeleted:true},{new:true})
    if(!finalData) return res.send("Image already deleted or not created yet")
    return res.send({status:true,data:finalData})
  }

  module.exports = {generateImage,getAllImage,deleteImage}