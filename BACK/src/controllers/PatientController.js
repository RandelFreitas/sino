const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');

module.exports = {
    async getAll(req, res){
        const patients = await Patient.find();
        return res.json(patients);
    },
};