const mongoose = require("../database/Connect");
const Patient = require('../models/Patient');
const Address = require('../models/Address');
const validator = require('cpf-cnpj-validator');

module.exports = {
    async create(req, res){
        try{
            const {name, email, cpf, phone1, phone2, dtBirth, sex, obs, address} = req.body;
            
            if(!validator.cpf.isValid(cpf)){
                return res.status(400).send({error: 'CPF invalid: '+cpf})
            }

            const patient = await Patient().create({name, email, cpf, phone1, phone2, dtBirth, sex, obs});

            const patientAddress = Address()({...address, parentId: patient._id});
            await patientAddress.save();
            patient.address = patientAddress;
            await patient.save();

            return res.json(patient);
        } catch (err) {
            return res.status(400).send({error: 'Error creating new patient: '+err});
        }
    },
    async getAll(req, res){
        try {
            const {page = 1, limit = 10} = req.query;
            const patients = await Patient().paginate({}, {page, limit, populate: 'address'});
            return res.json(patients); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all patients: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const patient = await Patient().findOne({_id: req.params.patientId}).populate('address');
            return res.json(patient); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading patient by id: '+err});
        }
        
    },
    async deleteById(req, res){
        try {
            await Address().deleteOne({parentId: req.params.patientId});
            await Patient().findByIdAndRemove(req.params.patientId);
            return res.send(); 
        } catch (err) {
            return res.status(400).send({error: 'Error deleting patient by id: '+err});
        }
        
    },
    async updateById(req, res){
        try{
            const {name, email, cpf, phone1, phone2, dtBirth, sex, obs, address} = req.body;

            if(!validator.cpf.isValid(cpf)){
                return res.status(400).send({error: 'CPF invalid: '+cpf})
            }

            const patient = await Patient().findByIdAndUpdate(req.params.patientId, {
                name, email, cpf, phone1, phone2, dtBirth, sex, obs
            }, {new: true});

            patient.adresses = [];
            await Address().deleteOne({parentId: patient._id});

            const patientAddress = Address()({...address, parentId: patient._id});
            await patientAddress.save();
            patient.address = patientAddress;
            await patient.save();

            return res.json(await Patient().findOne({_id: req.params.patientId}).populate('address'));
        } catch (err) {
            return res.status(400).send({error: 'Error updating patient: '+err});
        }
    },
};