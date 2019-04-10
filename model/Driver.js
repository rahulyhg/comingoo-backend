const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: [true , 'Phone Number is required'],
        max: 15
    },
    fullName: {
        type: String,
        required: [true , 'Full name is required'],
        
    },
    gender: {
        type: String,
        required: [true , 'Gender is required']
    },
    password: {
        type: String,
        required: [true , 'Password is required']
    },
    city: {
        type: String,
        required: [true , 'City is required']
    },
    bank:{
        name: {
            type: String,
            required: [true , 'Bank Name is required']
        },
        accountNumber: {
            type: Number,
            required: [true , 'Bank account number is required']
        }   
    },
    car:{
        brand: {
            type: String,
            required: [true , 'Car Brand is required']
        },
        model: {
            type: String,
            required: [true , 'Car model is required']
        },
        color: {
            type: String,
            required: [true , 'Car color is required']
        },
        yearOfRelease: {
            type: Number,
            required: [true , 'Car year of release is required ']
        },
        licensePlateNumber: {
            type: String,
            required: [true , 'Car license plate number is required']
        },
    },
    idCardImages:{
        frontUrl: {
            type: String,
            required: [true , 'Identity Card front image is required']
        },
        backUrl: {
            type: String,
            required: [true , 'Identity Card back image is required']
        }

    },
    drivingLicenseImages:{
        frontUrl: {
            type: String,
            required: [true , 'Driving License front image is required']
        },
        backUrl: {
            type: String,
            required: [true , 'Driving License back image is required']
        }

    },
    vehicalRegistrationImages:{
        frontUrl: {
            type: String,
            required: [true , 'Vehical registration certificate front image is required']
        },
        backUrl: {
            type: String,
            required: [true , 'Vehical registration certificate back image is required']
        }

    },
    
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastLoginAt: {
        type: Date,
        default: Date.now,
        
    },
    token: {
        type: String,
        default: null
    }
    


});

const Drivers = mongoose.model('drivers', DriverSchema);



module.exports = Drivers;