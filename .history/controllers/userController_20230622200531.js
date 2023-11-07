const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const securePassword = async(password)=>{

    try {

      const passwordHash = await bcrypt.hash(password, 10);
      return passwordHash;
      
    } catch (error) {
      
      console.log(error.message);

    }
}

//for send mail

const sendVerifyMail = async(name, email, user_id)=>{

    try {

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
          user:'josephfrancizz555@gmail.com',
          password:''
        }
      });

      const mailOptions = {
          from:'josephfrancizz555@gmail.com',
          to:email.
      }
      
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
      const spassword = await securePassword(req.body.password);
      const newUser = new userModel({  // Change variable name from 'user' to 'newUser'
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno,
        image: req.file.filename,
        password: spassword,
        is_admin: 0
      });
  
      const userData = await newUser.save();
  
      if (userData) {
        sendVerifyMail(req.body.name, req.body.email, userData._id);
        res.render("registration", {message: "Your registration has been successful, Please verify your mail.",
        });
      } else {
        res.render("registration", {message: "Your registration has failed",
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