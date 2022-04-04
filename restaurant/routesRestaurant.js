const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const controllerRestaurant = require('./controllerRestaurant');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    [
        check('nameRestaurant', 'El nombre es obligatorio').not().isEmpty(),
        check('numberPhone', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrege un email valido').isEmail(),
        check('city', 'La ciudad es obligatoria').not().isEmpty(),
        check('country', 'El pais es obligatorio').not().isEmpty()
    ],
    controllerRestaurant.createRestaurant
);

router.get('/',
    auth,
    controllerRestaurant.getRestaurant
);

router.put('/:id',
    auth,
    controllerRestaurant.updateRestaurants
);

router.delete('/:id', 
    auth,
    controllerRestaurant.deleteRestaurant
);

module.exports = router;