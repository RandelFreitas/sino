const express = require("express");
const routes = express.Router();

const auth2Middleware = require("../../middleware/Auth2");
routes.use(auth2Middleware);

module.exports = routes;