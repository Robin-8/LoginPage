const root_user = require("../models/userModel");
const bcrypt = require('bcrypt');

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

         if(userData)




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


module.exports = {
    loadLogin,
    verifyLogin
}