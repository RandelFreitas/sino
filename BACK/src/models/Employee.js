const mongoose = require("../database/Connect");
const mongoosePaginate = require("mongoose-paginate");
const { tenantModel } = require("../middleware/MultiTenant");
const Address = require('./Address');
const Permission = require('./Permission');

const EmployeeSchema = new mongoose.Schema({
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
  dtBirth: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
  registro: {
    type: String
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  obs: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Address,
  },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Permission,
  },
});

EmployeeSchema.plugin(mongoosePaginate);
const Employee = tenantModel("Employee", EmployeeSchema);
module.exports = Employee;