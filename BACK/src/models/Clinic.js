const mongoose = require("../database/Connect");
const mongoosePaginate = require("mongoose-paginate");
const { tenantlessModel } = require("../middleware/MultiTenant");
const Address = require('./Address');

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
});

ClinicSchema.plugin(mongoosePaginate);
const Clinic = tenantlessModel("Clinic", ClinicSchema);
module.exports = Clinic;