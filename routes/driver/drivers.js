let DriverModel = require('../../model/Driver');
let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST ADD NEW USER
router.post('/addDriver', async (req, res) => {
    try {
        const user = new DriverModel(req.body);

        await user.save();
        res.status(201).send({ message: "User successfully inserted!" })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})


//POST REGISTER
router.post('/registerDriver', async (req, res) => {

    const checkUser = await DriverModel.find({ email: req.body.email });
    if (checkUser.length) {
        res.status(404).send({ message: "User already exists!" });
        return;
    }


    const user = req.body;
    const hash = hashPassword(user.password);

    const newUser = new DriverModel({ name: user.name, email: user.email, password: hash });
    try {
        await newUser.save();
        res.status(201).send({ message: "User registered successfully!" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
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
})







function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

module.exports = router;