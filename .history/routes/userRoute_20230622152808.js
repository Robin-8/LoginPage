const express = require("express");
const user_route = express();

res.

const userController = require("../controllers/userController");

user_route.get('/register',userController.loadRegister);

module.exports = user_route;