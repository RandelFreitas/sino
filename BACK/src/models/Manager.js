const mongoose = require("../database/Connect");
const mongoosePaginate = require("mongoose-paginate");
const { tenantlessModel } = require("../middleware/MultiTenant");
const Address = require('../models/Address');

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address,
  },
});

ManagerSchema.plugin(mongoosePaginate);
const Manager = tenantlessModel("Manager", ManagerSchema);
module.exports = Manager;