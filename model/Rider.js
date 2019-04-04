const mongoose = require('mongoose');


const RiderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 80
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }

});

const Riders = mongoose.model('riders', RiderSchema);


module.exports = Riders;