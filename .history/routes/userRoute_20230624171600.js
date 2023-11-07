const express = require("express");
const userController = require("../controllers/userController");
const route = express();
const session = require('express-session');

const config = require('../config/config');
const nocache = require("nocache");

route.use(session({
    secret:config.sessionSecret,
    saveUninitialized: false}));

const auth = require('../middleware/auth');

route.set('view engine', 'ejs');
route.set('views','./views/users');
route.use(nocache());
const bodyParser = require("body-parser");
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");


route.use(express.static());

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


route.get('/register',auth.isLogout,userController.loadRegister);

route.post('/register',upload.single('image'),userController.insertUser);

route.get('/verify',userController.verifyMail);

route.get('/',auth.isLogout,userController.loginLoad);
route.get('/login',auth.isLogout,userController.loginLoad);

route.post('/login',userController.verifyLogin);

route.get('/home',auth.isLogin,userController.loadHome);

route.get('/logout',auth.isLogin,userController.userLogout);

route.get('/Verification',userController.verificationLoad);

route.post('/verification',userController.sentVerificationLink);

module.exports = route;