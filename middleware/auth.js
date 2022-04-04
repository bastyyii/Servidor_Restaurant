const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');
    
    if(!token){
        return res.status(401).json({msg: 'Sin autorizacion'});
    }
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user
        next();
    } catch (error) {
        return res.status(500).json({msg: 'Token no valido'});
    }
}