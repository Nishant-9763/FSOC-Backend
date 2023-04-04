const mongoose = require("mongoose");

const isvalidpassword = function (password) {
    password=password.trim()
    const passwordRegex = 	/^(?=.[a-z0-9])[a-zA-Z0-9!@#$%^&]{8,15}$/; // atleast one numericdigit
    return passwordRegex.test(password);
};



const isvalidEmail = function (email) {
    email=email.trim()
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
};

const isvaliduserId = function (userId) {
    userId=userId.trim()
    return mongoose.Types.ObjectId.isValid(userId);
  };


  
  


module.exports = {
    isvalidpassword,
    isvalidEmail,
    isvaliduserId,
    
};