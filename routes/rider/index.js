const RiderModel = require('../../model/Rider');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../../helpers/passwordHashing');




// POST ADD
router.post('/addRider', async (req, res) => {
    console.log(req.body);
    try {
        const user = new RiderModel(req.body);

        await user.save();
        res.status(201).send({ message: "User successfully inserted!" })
    } catch (e) {
        res.status(500).send({ message: e })
    }
})



// POST REGISTER RIDER
router.post('/registerRider', async (req, res) => {

    const user = req.body;

    if (!validateEmail(user.email)) {
        res.status(404).send({ message: "Email is not valid!" });
        return;
    }

  const checkRider = await RiderModel.find({ email: user.email });
  if (checkRider.length) {
      res.status(404).send({ message: "Rider email already exists!" });
      return;
  }

  if(user.phone){
      if(validatePhone(user.phone)){
        const checkRiderByPhone = await RiderModel.find({ phone: user.phone });
        if (checkRiderByPhone.length) {
            res.status(404).send({ message: "Rider phone already exists!" });
            return;
        }
      }else{
        res.status(400).send({ message: "Invalid Phone Number!" });
        return;
      }
    
  }


  const rider = req.body;
  const hash = hashPassword(rider.password);
  //const hash = "dummy";

  const new_rider = new RiderModel({ 
      full_name: rider.full_name,
      email: rider.email,
      phone: rider.phone,
      gender: rider.gender,
      profile_picture_url: rider.profile_picture_url,
      fb_access_token: rider.fb_access_token,
      password : hash

    });
  try {
      await new_rider.save();
      res.status(201).send({ message: "Rider registered successfully!" });
  } catch (e) {
      res.status(500).send({ message: e.message });
  }

})



//POST LOGIN RIDER
router.post('/loginRider', async (req, res) => {
    var rider = null;
    const username = req.body.username;
    
    if(validateEmail(username)){
        //Check Email,facebook login
        rider = await RiderModel.findOne({ email: username });
        if (rider == null) {
            res.status(404).send({ message: "Rider email not found!" });
            return;
        }
    }
    else if(validatePhone(username)){
        //Check Phone 
        console.log(validatePhone(username));
        try {
            rider = await RiderModel.findOne({ phone: username });
            if (rider == null) {
                res.status(404).send({ message: "Rider phone not found!" });
                return;
            }
        } catch (error) {
            res.status(500).send({ message: error.message });
                return;
        }
        
    }
    else{
        res.status(404).send({ message: "Rider login bad request!" });
            return;
    }

    const passwordMatched = bcrypt.compareSync(req.body.password, rider.password);

    if (!passwordMatched) {
        res.status(401).send({ message: "Incorrect Password!" }); // Unauthorized
        return;
    }

    //Generate Token
    const token = jwt.sign({ user: rider }, 'anySecretKey');
    //res.status(200).send({ token });

    console.log(token);

    RiderModel.findOneAndUpdate({
        phone: rider.phone},{ 
        $set:{last_login_at: Date.now(), auth_token: token  }}, 
        { multi: true , new: true},
        (err, doc) => {

        if (err) {

            res.status(500).send({ message: err.message }); //Internal Server Error
        }
        console.log('doc: ',doc.auth_token);
        res.status(202).send({ 
            id: doc._id,
            full_name: doc.full_name, 
            email: doc.email,
            phone: doc.phone,
            gender: doc.gender,
            profile_picture_url: doc.profile_picture_url,
            created_at: doc.created_at,
            updated_at: doc.updated_at,
            last_login_at: doc.last_login_at,
            auth_token: doc.auth_token
         }); //Login Accepted
    })
    .catch(e => {
        res.status(500).send({ message: e.message }); //Internal Server Error
    })
})




//GET ALL RIDERS
router.get('/getAllRiders', async (req, res) => {
    try {
        const users = await RiderModel.find({})
        res.send(users);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
})


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}


module.exports = router;