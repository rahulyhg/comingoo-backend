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

  const checkUser = await RiderModel.find({ email: req.body.email });
  if (checkUser.length) {
      res.status(404).send({ message: "User already exists!" });
      return;
  }


  const user = req.body;
  const hash = hashPassword(user.password);

  const newUser = new RiderModel({ name: user.name, email: user.email, password: hash });
  try {
      await newUser.save();
      res.status(201).send({ message: "User registered successfully!" });
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
router.get('/getAllriders', async (req, res) => {
    try {
        const users = await RiderModel.find({})
        res.send(users);
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
})



module.exports = router;
