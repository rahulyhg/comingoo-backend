const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
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

const Drivers = mongoose.model('drivers', DriverSchema);



module.exports = Drivers;