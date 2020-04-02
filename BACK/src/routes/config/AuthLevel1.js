const express = require("express");
const routes = express.Router();

const authMiddleware = require("../../middleware/Auth");
routes.use(authMiddleware);

module.exports = routes;