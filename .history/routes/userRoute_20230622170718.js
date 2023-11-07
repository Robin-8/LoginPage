const express = require("express");
const userRoute = express();

userRoute.set('view engine', 'ejs');
userRoute.set('views','./views/users');

const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

userRoute.get('/register',userController.loadRegister);

userRoute.post('/register',userController.insertUser)

module.exports = userRoute;