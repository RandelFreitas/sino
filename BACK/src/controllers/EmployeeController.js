const mongoose = require("../database/Connect");
const Employee = require('../models/Employee');
const User = require('../models/User');
const Address = require('../models/Address');
const validator = require('cpf-cnpj-validator');
const { setCurrentTenantId } = require("../middleware/Storage");

module.exports = {
    async create(req, res){
        try{
            const {name, email, cpf, phone, registro, dtBirth, sex, obs, address, password} = req.body; 
            
            if(!validator.cpf.isValid(cpf)){
                return res.status(400).send({error: 'CPF invalid: '+cpf})
            }

            const employee = await Employee().create({name, email, cpf, phone, registro, dtBirth, sex, obs});

            const employeeAddress = Address()({...address, parentId: employee._id});
            await employeeAddress.save();
            employee.address = employeeAddress;
            await employee.save();
            
            if(await User().findOne({email})){
                return res.status(400).send({error: 'User already exists: '+email})
            }

            const user = await User().create({email, password, userType: 'Employee', parentId: employee._id});

            return res.json(employee);
        } catch (err) {
            return res.status(400).send({error: 'Error creating new employee: '+err});
        }
    },
    async getAll(req, res){
        try {
            var {page = 1, limit = 10} = req.query; 
            page = parseInt(page);
            limit = parseInt(limit);
            const employees = await Employee().paginate({}, {page, limit, populate: 'address'});
            return res.json(employees); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all employees: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const employee = await Employee().findOne({_id: req.params.employeeId}).populate('address');
            return res.json(employee); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading employee by id: '+err});
        }
    },
    async updateById(req, res){
        try{
            const {name, email, cpf, phone, registro, dtBirth, sex, obs, address} = req.body; 

            if(!validator.cpf.isValid(cpf)){
                return res.status(400).send({error: 'CPF invalid: '+cpf})
            }

            const employee = await Employee().findByIdAndUpdate(req.params.employeeId, {
                name, email, cpf, phone, registro, dtBirth, sex, obs
            }, {new: true});

            employee.adresses = [];
            await Address().deleteOne({parentId: employee._id});

            const employeeAddress = Address()({...address, parentId: employee._id});
            await employeeAddress.save();
            employee.address = employeeAddress;
            await employee.save();

            return res.json(await Employee().findOne({_id: req.params.employeeId}).populate('address'));
        } catch (err) {
            return res.status(400).send({error: 'Error updating employee: '+err});
        }
    },
};