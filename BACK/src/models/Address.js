const mongoose = require("mongoose");

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
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

mongoose.model("Address", AddressSchema);