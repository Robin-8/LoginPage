const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async(password)=>{

    try {

      bcrypt.hash()
      
    } catch (error) {
      
      console.log(error.message);

    }

}
const loadRegister = async(req,res)=>{
    try{ 

        res.render('registration');

    }

    catch (error){

        console.log(error.message);

    }
}


const insertUser = async (req, res) => {
    try {
      const newUser = new userModel({  // Change variable name from 'user' to 'newUser'
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno,
        image: req.file.filename,
        password: req.body.password,
        is_admin: 0
      });
  
      const userData = await newUser.save();
  
      if (userData) {
        res.render("registration", {
          message: "Your registration has been successful, Please verify your mail.",
        });
      } else {
        res.render("registration", {
          message: "Your registration has failed",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  

module.exports = {
    loadRegister,
    insertUser
}