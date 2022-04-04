const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    nameRestaurant: {
        type: String,
        require: true,
        trim: true
    },
    numberPhone: {
        type: Number,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        Unique: true    
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: String,
        require: true,
        trim: true
    },
    country: {
        type: String,
        require: true,
        trim: true
    },
    branch: {
        type: Number,
        trim: true
    },
    registration: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);