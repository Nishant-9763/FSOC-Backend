const express = require("express")
const route = express.Router()
const {generateImage,getAllImage} = require("../controllers/imageController")


route.post("/generateImage", generateImage)
route.get("/getImage", getAllImage)



module.exports = route