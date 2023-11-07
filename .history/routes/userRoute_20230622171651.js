const express = require("express");
const route = express();

ro.set('view engine', 'ejs');
ro.set('views','./views/users');

const bodyParser = require("body-parser");
ro.use(bodyParser.json());
ro.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

ro.get('/register',userController.loadRegister);

ro.post('/register',userController.insertUser)

module.exports = user_route;