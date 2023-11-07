const express = require("express");
const route = express();

rout.set('view engine', 'ejs');
rout.set('views','./views/users');

const bodyParser = require("body-parser");
rout.use(bodyParser.json());
rout.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

rout.get('/register',userController.loadRegister);

rout.post('/register',userController.insertUser)

module.exports = user_route;