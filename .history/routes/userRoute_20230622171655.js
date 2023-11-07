const express = require("express");
const route = express();

router.set('view engine', 'ejs');
router.set('views','./views/users');

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const userController = require("../controllers/userController");

router.get('/register',userController.loadRegister);

router.post('/register',userController.insertUser)

module.exports = user_route;