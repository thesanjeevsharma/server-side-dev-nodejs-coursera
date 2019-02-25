const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const promoSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    label : {
        type : String,
        required : true
    },
    price : {
        type: mongoose.Types.Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean
    },
    description : {
        type: String,
        required: true
    }
}, {
    timestamps : true
})

const Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;