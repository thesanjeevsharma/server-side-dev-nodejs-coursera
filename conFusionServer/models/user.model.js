const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

const Users = mongoose.model('User', userSchema);

module.exports = Users;