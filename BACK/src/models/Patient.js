const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    dataNasc: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

mongoose.model("Patient", PatientSchema);