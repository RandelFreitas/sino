const express = require("express");
const routes = express.Router();
const AuthController = require("../controllers/AuthController") 

//create user
routes.post("/register", AuthController.register);

//authenticate user
routes.post("/authenticate", AuthController.authenticate);

module.exports = app => app.use("/auth", routes);