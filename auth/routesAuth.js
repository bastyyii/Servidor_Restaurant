const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const controllerAuth = require('./controllerAuth');
const auth = require('../middleware/auth');

router.post('/', 
    [
        check('email', 'Agrege un email valido').isEmail(),
        check('password', 'la contraseña debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    controllerAuth.authUsers
);

router.get('/',
    auth,
    controllerAuth.getUser
);

module.exports = router;