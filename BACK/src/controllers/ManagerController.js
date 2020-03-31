const mongoose = require("../database/Connect");
const Manager = require('../models/Manager');
const User = require('../models/User');
const { setCurrentTenantId } = require("../middleware/Storage");

module.exports = {
    async create(req, res){
        try{
            const {name, email, password} = req.body; 
            const manager = await Manager().create({name, email});

            setCurrentTenantId(manager._id);
            
            if(await User({skipTenant: true}).findOne({email})){
                return res.status(400).send({error: 'User already exists: '+email})
            }

            const user = await User().create({email, password, userType: 'Manager', parentId: manager._id});

            return res.json(manager);
        } catch (err) {
            return res.status(400).send({error: 'Error creating new manager: '+err});
        }
    },
    async getAll(req, res){
        try {
            const {page = 1, limit = 10} = req.query;
            const managers = await Manager().paginate({}, {page, limit});
            return res.json(managers); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading all managers: '+err});
        }
        
    },
    async getById(req, res){
        try {
            const manager = await Manager().findById(req.params.managerId);
            return res.json(manager); 
        } catch (err) {
            return res.status(400).send({error: 'Error loading manager by id: '+err});
        }
        
    },
};