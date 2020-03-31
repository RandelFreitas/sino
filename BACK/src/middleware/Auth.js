const jwt = require('jsonwebtoken');
const AuthConfig = require("../config/auth");
const { setCurrentTenantId } = require("../middleware/Storage");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send({error: 'No token provided'});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        res.status(401).send({error: 'Invalid token'});
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)){
        res.status(401).send({error: 'Tonken malformatted'});
    }

    jwt.verify(token, AuthConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Invalid token'});

        req.userId = decoded.id;
        const [model, tenantId] = decoded.tenantId.split('-');
        setCurrentTenantId(tenantId);

        return next();
    });
};