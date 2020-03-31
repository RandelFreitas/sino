const mongoose = require('mongoose');

module.exports = {
    async authenticate(req, res){
        try{
            
            return res.status(200);
        } catch (err) {
            return res.status(401).send({error: 'Error authenticate user: '+err});
        }
    },
};