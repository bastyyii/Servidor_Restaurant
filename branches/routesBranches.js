const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middleware/auth');
const controllerBranch = require('./controllerBranches');

router.post('/', 
    auth,
    [
        check('nameBranch', 'El nombre es obligatorio').not().isEmpty()
    ],
    controllerBranch.createBranch
);

router.get('/:restaurant',
    auth,
    controllerBranch.getBranches
);

router.delete('/:id/:restaurant',
    auth,
    controllerBranch.deleteBranch
);

router.put('/:id',
    auth,
    controllerBranch.updateBranc
);

module.exports = router;