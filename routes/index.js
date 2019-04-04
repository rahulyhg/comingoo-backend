const express = require("express");
const router = express.Router();

router.use("/drivers", require("./driver/drivers"));
router.use("/riders", require("./rider/riders"));

module.exports = router;