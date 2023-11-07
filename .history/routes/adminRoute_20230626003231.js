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


const multer = require("multer");
const path = require("path");


admin_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, '../public/userImages'));
    },
    filename:function(req,file,cb){
        const name =  Date.now()+'-'+file.originalname;
        cb(null,name);        
    }
});

const upload = multer({storage:storage});



const auth = require("../middleware/adminAuth");

const adminController = require("../controllers/adminController");

admin_route.get('/',auth.isLogout,adminController.loadLogin);

admin_route.post('/',adminController.verifyLogin);

admin_route.get('/home',auth.isLogin,adminController.loadDashboard);

admin_route.get('/logout',auth.isLogin,adminController.logout);

admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard);

admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad);

admin_route.post('/new-user',upload.single('image'),adminController.addUser);

admin_route.get

admin_route.get('*',(req,res)=>{
    if (req.url !== '/admin') {
    res.redirect('/admin');
    }
});








module.exports = admin_route;