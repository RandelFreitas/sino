const mongoose = require("../database/Connect");
const mongoosePaginate = require("mongoose-paginate");

const { tenantModel } = require("../middleware/MultiTenant");

const Address = require('../models/Address');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    cpf: {
        type: String,
    },
    phone1: {
        type: String,
        required: true,
    },
    phone2: {
        type: String,
    },
    dtBirth: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
    },
    obs: {
        type: String,
    },
    adresses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

PatientSchema.plugin(mongoosePaginate);

module.exports = tenantModel("Patient", PatientSchema);