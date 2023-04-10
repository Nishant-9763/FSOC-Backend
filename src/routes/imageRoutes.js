const express = require("express")
const route = express.Router()
const {generateImage,getAllImage,deleteImage} = require("../controllers/imageController")
const {verifyToken,verifyTokenAndAuthorization} = require("../middlewares/userMiddleware")

route.post("/generateImage/:userId",verifyTokenAndAuthorization, generateImage)
route.get("/getImage/:userId", verifyTokenAndAuthorization,getAllImage)
route.delete("/deleteImage/:userId/:imageId", verifyTokenAndAuthorization,deleteImage)




module.exports = route