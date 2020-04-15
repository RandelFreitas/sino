const mongoose = require("../database/Connect");
const mongoosePaginate = require("mongoose-paginate");
const { tenantModel } = require("../middleware/MultiTenant");
const Address = require('./Address');

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
  registro: {
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

EmployeeSchema.plugin(mongoosePaginate);
const Employee = tenantModel("Employee", EmployeeSchema);
module.exports = Employee;