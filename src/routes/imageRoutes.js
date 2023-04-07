const express = require("express")
const route = express.Router()
const {generateImage,getAllImage,deleteImage} = require("../controllers/imageController")


route.post("/generateImage/:userId", generateImage)
route.get("/getImage/:userId", getAllImage)
route.delete("/deleteImage/:userId/:imageId", deleteImage)




module.exports = route