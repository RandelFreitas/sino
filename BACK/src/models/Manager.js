const mongoose = require("../database/Connect");
const { tenantlessModel } = require("../middleware/MultiTenant");

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const Manager = tenantlessModel("Manager", ManagerSchema);
module.exports = Manager;