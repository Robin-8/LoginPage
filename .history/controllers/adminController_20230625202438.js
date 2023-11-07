const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const config = require("../config/config");
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

const addUserMail  = async(name, email, password, user_id)=>{

   try {
     console.log(name, email, user_id)
     const transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
       port:587,
       secure:false,
       requireTLS:true,
       auth:{
         user:'josephfrancizz555@gmail.com',
         pass:'tewfsbnpaqtuekgr'
         
       }
     });

     const mailOptions = {
         from:'josephfrancizz555@gmail.com',
         to:email,
         subject:'Admin add you and Verify your mail',
         html:'<p>Hyy '+name+', please click here to <a href="http://127.0.0.1:3000/verify?id='+user_id+' "> Verify </a> your mail.</p> <br> <br>Email:-<br>'+'
     }

     transporter.sendMail(mailOptions, function(error,info){
       console.log(info,mailOptions)
       if(error){
         console.log(error);
       }

       else{
         console.log("Email has been send:-  ",info.response);
     }

     });

     
   } catch (error) {
     console.log(error.message);
     
   }
}


const loadLogin  = async(req,res)=>{
     try {

        res.render('login');
        
     } catch (error) {
        console.log(error.message);
     }
}


const verifyLogin = async(req,res)=>{

   try {

      const email = req.body.email;
      const password = req.body.password;  

      const userData = await User.findOne({email:email});
      if(userData){

       const passwordMatch = await bcrypt.compare(password,userData.password);

       if(passwordMatch ){

         if(userData.is_admin === 0){

            res.render('login',{message:"Email and password is incorrect "}); 
         }


         else{

            req.session.user_id = userData._id;
            res.redirect("/admin/home");
      }


       }

       else{

         res.render('login',{message:"Email and password is incorrect "}); 

       }

      }

      else{
           res.render('login',{message:"Email and password is incorrect "}); 
      }

      
   } catch (error) {
      console.log(error.message);
      
   }

}


const loadDashboard = async(req,res)=>{

   try {
      const userData = await User.findById({_id:req.session.user_id});
      res.render('home',{admin:userData});
   } catch (error) {
      console.log(error.message);
   }

}


const logout = async(req,res)=>{
   try {

      req.session.destroy();
      res.redirect('/admin');
      
   } catch (error) {
      console.log(error.message);
   }
}


const adminDashboard = async(req,res)=>{

   try {
      const usersData = await User.find({is_admin:0});
      res.render('dashboard',{users:usersData});

   } catch (error) {
      console.log(error.message);
   }

}


//* Add New Work start */

const newUserLoad = async(req,res)=>{
   try {

      res.render('new-user');
      
   } catch (error) {

      console.log(error.message);
      
   }
}



const addUser = async(req,res)=>{
   try {

       const name = req.body.name; 
       const email = req.body.email;
       const mno = req.body.mno;
       const image = req.file.filename;
       const password = randomstring.generate(8); 
       
       const sec_password = await securePassword(password);
       
       const user = new User({

         name:name,
         email:email,
         mobile:mno,
         image:image,
         password:sec_password

       });


       const userData  = await user.save();

       if(userData){

         res.redirect('/admin/dashboard');

       }

       else{

         res.render('new-user',{message:'Something wrong.'})

       }


      
   } catch (error) {
      console.log(error.message);
   }
}



module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser
}