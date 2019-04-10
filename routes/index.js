const express = require("express");
const router = express.Router();
/**
 * @swagger
 * definition:
 *   driver:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   driver_login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   auth_token:
 *     properties:
 *       token:
 *         type: string
 *   rider:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   rider_login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/drivers/addDriver:
 *   post:
 *     tags:
 *       - Add drivers
 *     description: Admin will add driver information
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Driver Info
 *         description: driver info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/driver'
 *     responses:
 *       201:
 *         description: An json object of driver information
 *         schema:
 *           $ref: '#/definitions/driver'
 */

 /**
 * @swagger
 * /api/drivers/registerDriver:
 *   post:
 *     tags:
 *       - Register drivers
 *     description: Driver will register their account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Driver Info
 *         description: driver info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/driver'
 *     responses:
 *       201:
 *         description: An json object of driver information
 *         schema:
 *           $ref: '#/definitions/driver'
 */

/**
 * @swagger
 * /api/drivers/loginDriver:
 *   post:
 *     tags:
 *       - Login driver
 *     description: Driver will login their account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Driver Info
 *         description: driver info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/driver_login'
 *     responses:
 *       200:
 *         description: An token
 *         schema:
 *           $ref: '#/definitions/auth_token'
 */

 /**
 * @swagger
 * /api/drivers/getAlldriver:
 *   get:
 *     tags:
 *       - Get all drivers
 *     description: Returns all driver list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/driver'
 */

 /**
 * @swagger
 * /api/riders/addRider:
 *   post:
 *     tags:
 *       - Add riders
 *     description: Admin will add rider information
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Rider Info
 *         description: rider info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/rider'
 *     responses:
 *       201:
 *         description: An json object of rider information
 *         schema:
 *           $ref: '#/definitions/rider'
 */


  /**
 * @swagger
 * /api/riders/registerRider:
 *   post:
 *     tags:
 *       - Register riders
 *     description: Rider will register their own account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Rider Info
 *         description: rider info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/rider'
 *     responses:
 *       201:
 *         description: An json object of rider information
 *         schema:
 *           $ref: '#/definitions/rider'
 */

/**
 * @swagger
 * /api/riders/loginRider:
 *   post:
 *     tags:
 *       - Login rider
 *     description: Rider will login their account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Rider Info
 *         description: rider info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/rider_login'
 *     responses:
 *       200:
 *         description: An token
 *         schema:
 *           $ref: '#/definitions/auth_token'
 */

 /**
 * @swagger
 * /api/riders/getAllriders:
 *   get:
 *     tags:
 *       - Get all riders information
 *     description: Returns all rider list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/rider'
 */

router.use("/drivers", require("./driver"));
router.use("/riders", require("./rider"));

module.exports = router;