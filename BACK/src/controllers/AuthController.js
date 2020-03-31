const mongoose = require("../database/Connect");
const User = require('../models/User');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthConfig = require("../config/auth");

module.exports = {
    async register(req, res){
        const {email} = req.body;
        try{
            if(await User().findOne({email})){
                return res.status(400).send({error: 'User already exists: '+email})
            }
            const user = await User().create(req.body);
            user.password = undefined;
            return res.json(user);
        } catch (err) {
            return res.status(400).send({error: 'Registration failed: '+err});
        }
    },
    async authenticate(req, res){
        const {email, password} = req.body;
        try{
            const user = await User({skipTenant: true}).findOne({email}).select('+password');

            if(!user){
                return res.status(400).send({error: 'User no found: '+email});
            }

            if (!await bcrypt.compare(password, user.password)){
                return res.status(400).send({error: 'Invalid password: '+email});
            }

            user.password = undefined;

            const token = jwt.sign({id: user.id, tenantId: user.tenantId, parentId: user.parentId}, AuthConfig.secret, {
                expiresIn: 86400,
            });

            return res.send({user, token});
        } catch (err) {
            return res.status(401).send({error: 'Error authenticate user: '+err});
        }
    },
};