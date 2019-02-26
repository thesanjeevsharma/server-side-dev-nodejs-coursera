const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
}, {
    timestamps: true
});

const Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;