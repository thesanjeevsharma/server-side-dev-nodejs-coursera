const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required: true
    },
    abbr : {
        type : String,
        required : true
    },
    featured : {
        type : Boolean,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}, {
    timestamps: true
})

const Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;