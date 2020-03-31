const mongoose = require("mongoose");

const { tenantModel } = require("../lib/MultiTenant");

const AddressSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    district: {
        type: String
    },
    zip: {
        type: String
    },
    obs: {
        type: String
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = tenantModel("Address", AddressSchema);