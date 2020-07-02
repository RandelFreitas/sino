const mongoose = require("../database/Connect");
const bcrypt = require("bcryptjs");
const { tenantModel } = require("../middleware/MultiTenant");

const PermissionSchema = new mongoose.Schema({
    supportClinic: {
        type: Boolean,
        required: true,
    },
    supportFinances: {
        type: Boolean,
        required: true,
    },
    supportEmployee: {
        type: Boolean,
        required: true,
    },
    supportSchedule: {
        type: Boolean,
        required: true,
    },
    supportPatient: {
        type: Boolean,
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = tenantModel("Permission", PermissionSchema);