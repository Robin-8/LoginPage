const express = require("express");
const user_route = express();

const userController = require("../controllers/userController");

user_route.get('/register')

