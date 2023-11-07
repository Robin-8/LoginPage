const express = require("express");
const userRoute = express();

userRoute.set('view engine', 'ejs');
userRoute.set('views','./views/users');

const bodyParser = require("body-parser");
userRoute.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

user_route.get('/register',userController.loadRegister);

user_route.post('/register',userController.insertUser)

module.exports = user_route;