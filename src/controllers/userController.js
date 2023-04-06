const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const key = process.env.KEY;


const { checkEmail, createData } = require("../services/userService");

const { isvalidpassword,isvalidEmail} = require("../utils/validators/userValidator");





const createUser = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length === 0)
      return res.status(400).send({ message: "plz provide user's data" });

    let { email, password } = data;

    // if (Object.keys(rest).length > 0) return res.status(400).send({ message: "Invalid field data" });
    ///------------------------- Validation------------------------------------------

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is mandatory" });
    if (!isvalidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "plz enter valid email" });
    let checkEmailExist = await checkEmail(email); //** */
    if (checkEmailExist)
      return res
        .status(400)
        .send({ status: false, message: "This email already exist" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is mandatory" });

    if (!isvalidpassword(password.trim()))
      return res
        .status(400)
        .send({
          status: false,
          mesage: "password length must be  8 to  15 char",
        });

    let bcryptPass = await bcrypt.hash(password, 10);

    let userData = { email, password: bcryptPass };

    let createUser = await createData(userData); //*** */

    let userId = createUser._id;
    let token = JWT.sign({ userId: userId }, key);

    res
      .status(201)
      .send({
        status: true,
        message: "User created successfully",
        data: createUser,
        token: token,
      });
  } catch (error) {
    console.log("error in createUser", error.message);

    res.status(500).send({ status: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length === 0)
      return res.status(400).send({ message: "plz provide user's data" });
    let { email, password } = data;
    // if (Object.keys(rest).length >0) return res.status(400).send({ message: "plz provide valid data [email & password only]" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is mandatory" });
    if (!isvalidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "plz enter valid email" });

    let findUser = await checkEmail(email);
    if (!findUser)
      return res.status(404).send({ status: false, message: "User not found" });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is mandatory" });
    // password= password.trim()
    if (!isvalidpassword(password.trim()))
      return res
        .status(400)
        .send({
          status: false,
          message: "password length must be  8 to  15 char",
        });

    let userPassword = findUser.password;
    let originalPassword = await bcrypt.compare(password, userPassword);
    if (!originalPassword)
      return res
        .status(401)
        .send({
          status: false,
          message: "Incorrect password, plz provide valid password",
        });

    let userId = findUser._id;
    let token = JWT.sign({ userId: userId }, key);

    return res
      .status(200)
      .send({
        status: true,
        message: "User login successfull",
        data: { userId: userId, token: token },
      });
  } catch (error) {
    console.log("error in loginUser", error.message);
    return res.status(500).send({ status: false, message: error.mesage });
  }
};

module.exports = { createUser, loginUser };


const createImage = async function(req,res){
  const {prompt,size} = req.body

}
