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
      
   } catch (error) {
      console.log(error.);
      
   }

}


module.exports = {
    loadLogin
}