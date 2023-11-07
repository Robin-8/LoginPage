const express = require("express");
const userController = require("../controllers/userController");
const route = express();

route.set('view engine', 'ejs');
route.set('views','./views/users');

const bodyParser = require("body-parser");
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");

const storage = multer.diskStorage({})


route.get('/register',userController.loadRegister);

route.post('/register',userController.insertUser)

module.exports = route;