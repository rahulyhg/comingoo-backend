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
    const checkRiderByPhone = await RiderModel.find({ phone: user.phone });
    if (checkRiderByPhone.length) {
        res.status(404).send({ message: "Rider phone already exists!" });
        return;
    }
  }


  const rider = req.body;
  //const hash = hashPassword(rider.password);
  //const hash = "dummy";

  const new_rider = new RiderModel({ 
      full_name: rider.full_name,
      email: rider.email,
      phone: rider.phone,
      gender: rider.gender,
      profile_picture_url: rider.profile_picture_url,
      fb_access_token: rider.fb_access_token

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
  //Check Email
  const user = await RiderModel.find({ email: req.body.email });

  if (!user.length) {
      res.status(404).send({ message: "User not found!" });
      return;
  }

  const passwordMatched = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordMatched) {
      res.status(404).send({ message: "Incorrect Email/Password!" });
      return;
  }

  //Generate Token
  const token = jwt.sign({ user: user }, 'anySecretKey');
  res.status(200).send({ token });
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


module.exports = router;
