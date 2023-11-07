const userModel = require('../models/userModel');

const loadRegister = async(req,res)=>{
    try{ 

        res.render('registration');

    }

    catch (error){

        console.log(error.message);

    }
}


const insertUser = async(req,res)=>{

    try {
        const users = new user({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            image:req.file.filename,
            name:req.body.name,
            password:req.body.password,
            is_admin:0,
        });

        const userData = await users.save();

        if(userData){
            res.render("registration",{message:"Your registration has been successfully"});
        }

        else{
            res.render("registration",{message:"Your registration has been failed"});
        }
        
    } 
    
    catch (error) {
        console.log(error.message);
        
    }
}

module.exports = {
    loadRegister,
    insertUser
}