const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const loadLogin  = async(req,res)=>{
     try {

        res.render('login');
        
     } catch (error) {
        console.log(error.message);
     }
}


mo