const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const EmployeeController = require('../controllers/EmployeeController');
const PermissionManager = require('../middleware/PermissionManager');

//create employee
routes.post("/employees", PermissionManager.validateUser, EmployeeController.create);

//upadate patient by id
routes.put("/employees/:employeeId", PermissionManager.validateUser, EmployeeController.updateById);

//get all employees
routes.get("/employees", EmployeeController.getAll);

//get employee by id
routes.get("/employees/:employeeId", EmployeeController.getById);

module.exports = routes;