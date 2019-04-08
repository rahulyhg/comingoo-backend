const DriverModel = require('../../model/Driver');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


//POST REGISTER
router.post('/registerDriver', async (req, res) => {

    const checkUserbyPhone = await DriverModel.find({ email: req.body.phoneNumber });
    const checkUserbyLicensePlateNumber = await DriverModel.find({  licensePlateNumber: req.body.licensePlateNumber  });
    if (checkUserbyPhone.length || checkUserbyLicensePlateNumber.length ) {
        res.status(409).send({ message: "Phone number or license plate number already exists!" });
        return;
    }


    const user = req.body;

    bcrypt.hash(user.password, 10)
    .then(function(hash) {

        const newUser = new DriverModel({ 
            phoneNumber: user.phoneNumber, 
            fullName: user.fullName, 
            gender: user.gender,
            password: hash,
            city: user.city,
            bankAccountNumber: user.bankAccountNumber,
            BankName: user.BankName,
            carBrand: user.carBrand,
            carModel: user.carModel,
            carColor: user.carColor,
            yearOfRelease: user.yearOfRelease,
            licensePlateNumber: user.licensePlateNumber,
            identityCardImageFrontURL: user.identityCardImageFrontURL,
            identityCardImageBackURL: user.identityCardImageBackURL,
            drivingLicenseImageFrontURL: user.drivingLicenseImageFrontURL,
            drivingLicenseImageBackURL: user.drivingLicenseImageBackURL
    
        
    
         });
        try {
            newUser.save()
            .then(response =>{
    
                console.log(response)
                res.status(201).send({
                     message: "User registered successfully!",
                    });
                })
    
             
            .catch(err =>{
    
                res.status(500).send({ message: err.message });
                
            });
            
        
        } catch (e) {
            res.status(500).send({ message: e.message });
        }
    })
    .catch(error => {
           res.status(500).send({ message: error });
    })

})





//POST LOGIN DRIVER
router.post('/loginDriver', async (req, res) => {
    //Check Email
    const user = await DriverModel.find({ email: req.body.email });

    if (!user.length) {
        res.status(404).send({ message: "User not found!" });
        return;
    }

    const passwordMatched = bcrypt.compareSync(req.body.password, user[0].password);

    if (!passwordMatched) {
        res.status(404).send({ message: "Incorrect Email/Password!" });
        return;
    }

    //Generate Token
    const token = jwt.sign({ user: user[0] }, 'anySecretKey');
    res.status(200).send({ token });
})



//GET ALL DRIVERS
router.get('/getAlldriver', async (req, res) => {
    try {
        const users = await DriverModel.find({})
        res.send(users);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});


//DELETE
router.delete('/:id', function(req,res){ 

    var id = req.params.id;

    DriverModel.remove({_id: ObjectId(id)}, function(err, result){ //undefined??
        if (err) return res.status(500).send({err: 'Error: Could not delete driver'});
        if(!result) return res.status(400).send({err: 'driver deleted from database'});
        res.send(result); 
    });
});



module.exports = router;