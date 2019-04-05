const express = require("express");
const router = express.Router();

router.use("/drivers", require("./driver"));
router.use("/riders", require("./rider"));

module.exports = router;