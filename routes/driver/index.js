const DriverModel = require('../../model/Driver');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const saltRounds = 10;
const ObjectId = mongoose.Types.ObjectId;


//POST REGISTER
router.post('/registerDriver', async (req, res) => {

    const checkUser = await DriverModel.find(  { $or:[ { email: req.body.phoneNumber}, {  'car.licensePlateNumber': req.body.car.licensePlateNumber  } ]});  
    if (checkUser.length) {
        res.status(409).send({ message: "Phone number or license plate number already exists!" }); //Conflict
        return;
    }


    const user = req.body;

    

    bcrypt.hash(user.password, saltRounds)   //Asyn password hashing
    .then(hash => {

        const newUser = new DriverModel({ 
            phoneNumber: user.phoneNumber, 
            fullName: user.fullName, 
            gender: user.gender,
            password: hash,
            city: user.city,
            bank:{
                name: user.bank.name,
                accountNumber: user.bank.accountNumber,
            },
            car:{
                brand: user.car.brand,
                model: user.car.model,
                color: user.car.color,
                yearOfRelease: user.car.yearOfRelease,
                licensePlateNumber: user.car.licensePlateNumber,
            },
            idCardImages:{
                frontUrl: user.idCardImages.frontUrl,
                backUrl: user.idCardImages.backUrl,
            },
            drivingLicenseImages:{
                frontUrl: user.drivingLicenseImages.frontUrl,
                backUrl: user.drivingLicenseImages.backUrl,

            },
            vehicalRegistrationImages:{
                frontUrl: user.vehicalRegistrationImages.frontUrl,
                backUrl: user.vehicalRegistrationImages.backUrl
            }
    
         });
        try {
            newUser.save()
            .then(response =>{
    
                console.log(response)
                res.status(201).send({
                     message: "User registered successfully!",
                    });   //Created
                })
     
            .catch(err =>{
    
                res.status(500).send({ message: err.message }); //Internal Server Error Database
                
            });  
        }catch (e) {
            res.status(500).send({ message: e.message }); //Internal Server Error
        }
    })
    .catch(error => {
           res.status(500).send({ message: error }); //Internal Server Error hashing passwaord
    })

})





//POST LOGIN DRIVER ( RECEIVES PHONENUMBER AND PASSWOARD IN THE BODY)
router.post('/loginDriver', async (req, res) => {
    //Check Phone
    const user = await DriverModel.findOne({ phoneNumber: req.body.phoneNumber });

    if (user == null) {
        res.status(404).send({ message: "User not found!" });
        return;
    }

    const passwordMatched = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordMatched) {
        res.status(401).send({ message: "Incorrect Email/Password!" }); // Unauthorized
        return;
    }

    //Generate Token and returning full user has vulnerability issues that it can be decoded
    const token = jwt.sign({ user: user }, 'anySecretKey');


    DriverModel.findOneAndUpdate({
        phoneNumber: req.body.phoneNumber},{ 
        $set:{updatedAt: Date.now() , lastLoginAt: Date.now() , token: token  }}, 
        { multi: true , new: true},
        (err, doc) => {

        if (err || doc === null) {

            res.status(500).send({ message: err.message }); //Internal Server Error
        }

        res.status(202).send({ 
            phoneNumber: doc.phoneNumber, 
            fullName: doc.fullName, 
            gender: doc.gender,
            city: doc.city,
            bank:{
                name: doc.bank.name,
                accountNumber: doc.bank.accountNumber
            },
            car:{
                brand: doc.car.brand,
                model: doc.car.model,
                color: doc.car.color,
                yearOfRelease: doc.car.yearOfRelease,
                licensePlateNumber: doc.car.licensePlateNumber
            },
            idCardImages:{
                frontUrl: doc.idCardImages.frontUrl,
                backUrl: doc.idCardImages.backUrl
            },
            drivingLicenseImages:{
                frontUrl: doc.drivingLicenseImages.frontUrl,
                backUrl: doc.drivingLicenseImages.backUrl

            },
            vehicalRegistrationImages:{
                frontUrl: doc.vehicalRegistrationImages.frontUrl,
                backUrl: doc.vehicalRegistrationImages.backUrl
            },
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            lastLoginAt: doc.lastLoginAt,
            token: doc.token
         }); //Login Accepted
    })
    .catch(e => {
        res.status(500).send({ message: e.message }); //Internal Server Error
    })
    
})

router.post('/passwordReset', async (req, res) => {
    //Check Phone
   
    const user = req.body;

    bcrypt.hash(user.password, saltRounds)   //Asyn password hashing
    .then(hash => {
        
      DriverModel.findOneAndUpdate({
        phoneNumber: user.phoneNumber},{ 
        $set:{updatedAt: Date.now()},   password : hash  }, 
        { multi: true , new : true},
        (err, doc) => {

        if (err || doc === null ) {
            res.status(404).send({ message: "User not found!" });  //Not Found
            return;
        }
        else{
            res.status(201).send({message: "Password reset was successful!"});
            console.log(doc)
        }

         
    })
    .catch(e => {
        res.status(500).send({ message: e.message }); //Passwaord hashing error Error
    });

    
})

})


//------------------------------------------------------------------------------------------------------------------------

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