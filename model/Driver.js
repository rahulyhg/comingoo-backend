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
    bankAccountNumber: {
        type: Number,
        required: [true , 'Bank account number is required']
    },
    BankName: {
        type: String,
        required: [true , 'Bank Name is required']
    },
    carBrand: {
        type: String,
        required: [true , 'Car Brand is required']
    },
    carModel: {
        type: String,
        required: [true , 'Car model is required']
    },
    carColor: {
        type: String,
        required: [true , 'Car color is required']
    },
    yearOfRelease: {
        type: Number,
        required: [true , 'Phone Number is required ']
    },
    licensePlateNumber: {
        type: String,
        required: [true , 'Phone Number is required']
    },
    identityCardImageFrontURL: {
        type: String,
        required: [true , 'Identity Card front image is required']
    },
    identityCardImageBackURL: {
        type: String,
        required: [true , 'Identity Card back image is required']
    },
    drivingLicenseImageFrontURL: {
        type: String,
        required: [true , 'Driving License front image is required']
    },
    drivingLicenseImageBackURL: {
        type: String,
        required: [true , 'Driving License back image is required']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    lastLoginAt: {
        type: Date,
        default: Date.now(),
        
    }
    


});

const Drivers = mongoose.model('drivers', DriverSchema);



module.exports = Drivers;