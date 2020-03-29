const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');
const Address = mongoose.model('Address');

module.exports = {
    async create(req, res){
        try{
            const {name, email, cpf, phone1, phone2, dtBirth, sex, obs, adresses} = req.body;
            const patient = await Patient.create({name, email, cpf, phone1, phone2, dtBirth, sex, obs});

            await Promise.all(adresses.map(async address => {
                const patientAddress = new Address(address);
                await patientAddress.save();
                patient.adresses.push(patientAddress);
            }));

            await patient.save();

            return res.json(patient);
        } catch (err) {
            return res.status(400).send({error: 'Error creating new patient: '+err});
        }
    },
    async getAll(req, res){
        try {
            const patients = await Patient.find().populate("adresses");
            return res.json(patients); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all patients: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const patient = await Patient.findById(req.params.patientId).populate("adresses");
            return res.json(patient); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading patient by id: '+err});
        }
        
    },
    async deleteById(req, res){
        try {
            const patient = await Patient.findById(req.params.patientId);
            
            await Promise.all(patient.adresses.map(async address => {
                await Address.remove({_id: address._id});
            }));

            await Patient.remove(patient);
            return res.send(); 
        } catch (err) {
            return res.status(400).send({error: 'Error deleting patient by id: '+err});
        }
        
    },
};