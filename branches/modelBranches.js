const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
    nameBranch: {
        type: String,
        require: true,
        trim: true
    },
    numberPhone: {
        type: Number,
        trim: true
    },
    direction: {
        type: String,
        trim: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    registration: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Sucursales', BranchSchema);