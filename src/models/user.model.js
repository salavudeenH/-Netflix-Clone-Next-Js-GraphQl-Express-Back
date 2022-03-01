const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isSuscribe: {
        type: Boolean,
        required: true,
    },
    suscribeAt: {
        type: Date,
      },
});

module.exports = mongoose.model('User', userSchema);