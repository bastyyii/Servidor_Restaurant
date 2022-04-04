const bcryptjs = require('bcryptjs');
const UserModel = require('../users/modelUser');
const { generateToken } = require('../utils/jwt.utils');

exports.authUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({email});

        if(!user){
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        
        const checkPassword = await bcryptjs.compare(password, user.password);
        
        if(!checkPassword){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        const token = generateToken(payload);

        return res.status(200).json({token});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor authUser'})
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor getUser'});
    }
}