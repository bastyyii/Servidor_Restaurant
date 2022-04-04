const express = require('express');
const router = express.Router();

const controllerUser = require('./controllerUser');

router.post('/',
    controllerUser.createUser
);

module.exports = router;