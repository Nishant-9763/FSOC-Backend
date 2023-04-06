const imageModel = require("../models/imageModel")
const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require('cloudinary').v2;




  // Configuration  of "Cloudinary" //
  cloudinary.config({
      cloud_name: "ddraawvgd",
      api_key: "994722389161267",
      api_secret: "aMWYV3cdQ0UkSqZAfM8ec98OPto"
    });


  // Configuration of "openAi" //
  const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

  


  const generateImage = async function(req,res){
    try {

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
       let postDetails = {prompt,imageUrl:secure_url}   
       let finalData = await imageModel.create(postDetails)
       

      return  res.send({isSuccess: true,message: "Successfully uploaded image.",data:finalData})


    } catch (error) {
        console.log(error);
      return  res.status(500).send({status:false,Message:"This request is not available yet",error:error.message})
    }
  }



  const getAllImage = async function(req,res){
    const {} = req.params
    const finalData = await imageModel.find()
    return res.send({status:true,data:finalData})
    }

  module.exports = {generateImage,getAllImage}