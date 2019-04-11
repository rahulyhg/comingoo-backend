const mongoose = require('mongoose');


const RiderSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        max: 80
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
        max: 15
    },
    gender: {
        type: String,
        required: true,
    },
    profile_picture_url: {
        type: String,
        required: true
    },
    fb_access_token: {
        type: String,
        required: true,
    },
    auth_token: {
        type: String,
        required: false,
        default: null
    },
    last_login_at: {
        type: Date,
        default: Date.now
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now 
    }

});

const Riders = mongoose.model('riders', RiderSchema);


module.exports = Riders;