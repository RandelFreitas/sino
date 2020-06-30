const mongoose = require("../database/Connect");
const Clinic = require('../models/Clinic');
const Address = require('../models/Address');
const validator = require('cpf-cnpj-validator');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/auth");

module.exports = {
    async create(req, res){
        try{
            const {name, cnpj, email, phone, address} = req.body; 
            
            if(!validator.cnpj.isValid(cnpj)){
                return res.status(400).send({error: 'CNPJ invalid: '+cnpj})
            }

            const clinic = await Clinic().create({name, cnpj, email, phone});

            const clinicAddress = Address()({...address, parentId: clinic._id});
            await clinicAddress.save();
            clinic.address = clinicAddress;
            await clinic.save();

            return res.json(clinic);
        } catch (err) {
            return res.status(400).send({error: 'Error creating new clinic: '+err});
        }
    },
    async updateById(req, res){
        try{
            const {name, cnpj, email, phone, address} = req.body; 
            
            if(!validator.cnpj.isValid(cnpj)){
                return res.status(400).send({error: 'CNPJ invalid: '+cnpj})
            }

            const clinic = await Clinic().findByIdAndUpdate(req.params.clinicId, {
                name, cnpj, email, phone
            }, {new: true});

            clinic.address = undefined;
            await Address().deleteOne({parentId: clinic._id});

            const clinicAddress = Address()({...address, parentId: clinic._id});
            await clinicAddress.save();
            clinic.address = clinicAddress;
            await clinic.save();

            return res.json(await Clinic().findOne({_id: req.params.clinicId}).populate('address'));
        } catch (err) {
            return res.status(400).send({error: 'Error updating clinic: '+err});
        }
    },
    async getAll(req, res){
        try {
            var {page = 1, limit = 10} = req.query; 
            page = parseInt(page);
            limit = parseInt(limit);
            const clinics = await Clinic().paginate({}, {page, limit, populate: 'address'});    
            return res.json(clinics); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all clinics: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const clinic = await Clinic().findOne({_id: req.params.clinicId}).populate('address');
            return res.json(clinic); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading clinic by id: '+err});
        }
    },
    async authenticate(req, res){
        const {clinicId} = req.body;
        try{
            const clinic = await Clinic().findById(clinicId);
            const user = await User({skipTenant: true}).findById(req.userId);

            if(!user){
                return res.status(401).send({error: 'User no found: '+email});
            }

            if(!(user.userType === 'Manager')) {
                //pesquisar na tabela de funcionários se ele possui acesso a essa clinica caso não erro 401
            }

            const token = jwt.sign({id: user.id, tenantId: user.tenantId, subTenantId: clinic._id, parentId: user.parentId}, AuthConfig.secret, {
                expiresIn: 86400,
            });

            return res.send({user, token});
        } catch (err) {
            return res.status(401).send({error: 'Error authenticate user: '+err});
        }
    },
};