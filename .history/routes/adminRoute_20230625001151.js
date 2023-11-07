const express = require("express");
const admin_route = express();

const session = require('express-session');
const config = require("../config/config");
admin_route.use(session({
    secret:config.sessionSecret,
    saveUninitialized: false, // Add this line
    resave: false // Add this line

    }));


const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));    

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const adminController = require("../controllers/adminController");

admin_route.get('/',adminController.loadLogin);

admin_route.post('/',adminController.verifyLogin);

admin_route.get('/home',adminController.loadDashboard);

ad

admin_route.get('*',(req,res)=>{

    res.redirect('/admin');
});





module.exports = admin_route;