const users = require('../models/users');

module.exports = {
    parseAuthorizationHeader(req, res, next){
        const token = req.headers.authorization?.split(' ')[1];
        if(token){
            users.verifyTokenAsync(token)
                .then(user => {
                    req.user = user;
                    next();
                }).catch(err=> {
                    next({ code: 401, message: err });
                });
        }else{
            req.user = { role: 'user' };
            next();
        }
    },
    requireLogin(requireAdmin = false) {
        return (req, res, next) => {
            next();
        };
    }
};