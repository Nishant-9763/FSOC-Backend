const express = require("express")
const route = express.Router()
const {generateImage,getAllImage,deleteImage} = require("../controllers/imageController")
const {verifyTokenAndAuthorization} = require("../middlewares/userMiddleware")

route.post("/generateImage/:userId",verifyTokenAndAuthorization, generateImage)
route.get("/getImage/:userId", verifyTokenAndAuthorization,getAllImage)
route.delete("/deleteImage/:userId/:imageId", verifyTokenAndAuthorization,deleteImage)

route.all("/*",(req,res)=>{
    console.log("Plz enter valid route");
    res.status(400).send({status:false,message:"invalid route"})
})


module.exports = route