const jwt = require('jsonwebtoken');
exports.generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET, 
        {expiresIn: 3600});
    return token;
}