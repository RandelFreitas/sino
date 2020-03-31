const express = require("express");
const routes = express.Router();
const mongoose = require('mongoose');
const {Gestor} = require('../models/Gestor');

routes.get('/', (req, res) => {
    Gestor().create({name: "Gestor 1"});
    Gestor().create({name: "Gestor 2"});
    return res.send('Hello Odonto!');
});

module.exports = routes;