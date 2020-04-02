const jwt = require('jsonwebtoken');
const AuthConfig = require("../config/auth");
const { setCurrentTenantId, setCurrentSubTenantId } = require("./Storage");

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

        if(!decoded.subTenantId) return res.status(401).send({error: 'Invalid token, generate auth2'});

        setCurrentTenantId(tenantId);
        setCurrentSubTenantId(decoded.subTenantId);

        return next();
    });
};