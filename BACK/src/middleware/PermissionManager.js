const jwt = require('jsonwebtoken');
const AuthConfig = require("../config/auth");
const User = require('../models/User');

module.exports = {
    async validateUser(req, res, next){
        const authHeader = req.headers.authorization;
        const parts = authHeader.split(' ');
        const [scheme, token] = parts;
        decoded = await jwt.decode(token, AuthConfig.secret);
        const user = await User().findOne({_id: decoded.id});
        
        if(user.userType != 'Manager') {
            return res.status(401).send({error: 'Not authorized, you is not manager user'});
        }
        return next();
    }
};