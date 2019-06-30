const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        default: "user"
    }
});

UserSchema.pre('save', function(next){
    const user = this;
    
    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
