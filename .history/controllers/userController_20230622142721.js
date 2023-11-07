const user = require('../models/userModel');

const loadRegister = async(req,res)=>{
    try{

        res.render('registra')

    }

    catch (error){

        console.log(error.message);

    }

}