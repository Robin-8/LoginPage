const express = require("express");
const admin_route = express();

const session = require("express-session");
const config = require("../config/config");

const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));    

admin_route.set('view engine','ejs');
admin_route.set
