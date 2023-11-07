const mongoose = require("mongoose");

mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    password:{
        type:String
    }
});