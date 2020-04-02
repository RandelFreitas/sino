const mongoose = require("../database/Connect");
const Clinic = require('../models/Clinic');
const Address = require('../models/Address');
const validator = require('cpf-cnpj-validator');

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

            return res.json(clinic);
        } catch (err) {
            return res.status(400).send({error: 'Error updating clinic: '+err});
        }
    },
    async getAll(req, res){
        try {
            const {page = 1, limit = 10} = req.query;
            const clinics = await Clinic().paginate({}, {page, limit});
            return res.json(clinics); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all clinics: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const clinic = await Clinic().findById(req.params.clinicId).populate("address");
            return res.json(clinic); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading clinic by id: '+err});
        }
        
    },
};