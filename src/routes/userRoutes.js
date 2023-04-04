const express = require("express")
const route = express.Router()
const { createUser, loginUser } = require("../controllers/userController")


route.post("/register", createUser)
route.post("/login", loginUser)



route.all("/*",(req,res)=>{
    // console.log("Plz enter valid route");
    res.status(400).send({status:false,message:"invalid route"})
})



module.exports = route