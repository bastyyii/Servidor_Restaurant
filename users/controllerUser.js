const UserModel = require('./modelUser');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const { generateToken } = require('../utils/jwt.utils');

exports.createUser = async (req, res) => {

    const {email, password} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if(user){
            return res.status(400).json({msg: 'El email ya esta en uso'});
        }
        user = new UserModel(req.body);
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };
        
        const token = generateToken(payload);
        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor'});
    }
}