const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Credentials', "true");
        res.header('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token");
        res.header('Access-Control-Max-Age', '86400');
    }
    next();
}

module.exports = credentials