const mongoose = require("mongoose");
const { tenantlessModel } = require("../lib/MultiTenant");

const GestorSchema = new mongoose.Schema({
  name: String,
});

const Gestor = tenantlessModel("Gestor", GestorSchema);
module.exports = Gestor;