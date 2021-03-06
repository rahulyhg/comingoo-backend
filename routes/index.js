const express = require("express");
const router = express.Router();
/**
 * @swagger
 * definition:
 *   Driver:
 *     properties:
 *       phoneNumber:
 *         type: string
 *         example: 0123456789 
 *       fullName:
 *         type: string
 *         example: Alex Paris
 *       gender:
 *         type: string
 *         example: male 
 *       password:
 *         type: string
 *       city:
 *         type: string
 *         example: Dhaka 
 *       bank:
 *         type: object
 *         properties:
 *            name:
 *               type: string
 *               example: World Bank
 *            accountNumber:
 *                type: integer
 *                format: int64
 *                example: 1234567890 
 *       car:
 *          type: object
 *          properties:
 *             brand:
 *                type: string
 *                example: BMW
 *             model:
 *                type: string
 *                example: X1
 *             color:
 *                type: string
 *                example: red
 *             yearOfRelease:
 *                type: integer
 *                format: int64
 *                example: 2019
 *             licensePlateNumber:
 *                type: string
 *                example: 123-456-789
 *       idCardImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com
 *       drivingLicenseImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com
 *       vehicalRegistrationImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com 
 *   
 *        
 * 
 * 
 *   driver_login_request:
 *      type: object
 *      properties:
 *         phoneNumber:
 *           type: string
 *           example: 0123456789 
 *         password:
 *           type: string
 *           example: kajnxkNAKJCXNwncdkn
 * 
 *   driver_login_response:
 *      type: object
 *      properties:
 *       phoneNumber:
 *         type: string
 *         example: 0123456789 
 *       fullName:
 *         type: string
 *         example: Alex Paris
 *       gender:
 *         type: string
 *         example: male 
 *       city:
 *         type: string
 *         example: Dhaka 
 *       bank:
 *         type: object
 *         properties:
 *            name:
 *               type: string
 *               example: World Bank
 *            accountNumber:
 *                type: integer
 *                format: int64
 *                example: 1234567890 
 *       car:
 *          type: object
 *          properties:
 *             brand:
 *                type: string
 *                example: BMW
 *             model:
 *                type: string
 *                example: X1
 *             color:
 *                type: string
 *                example: red
 *             yearOfRelease:
 *                type: integer
 *                format: int64
 *                example: 2019
 *             licensePlateNumber:
 *                type: string
 *                example: 123-456-789
 *       idCardImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com
 *       drivingLicenseImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com
 *       vehicalRegistrationImages:
 *          type: object
 *          properties:
 *              frontUrl:
 *                  type: string
 *                  example: test.com
 *              backUrl:
 *                  type: string
 *                  example: test.com
 *       createdAt:
 *          type: string
 *          example: 2019-04-10T15:31:28.732Z
 *       updatedAt:
 *          type: string
 *          example: 2019-04-10T15:31:28.732Z
 *       lastLoginAt:
 *          type: string
 *          example: 2019-04-10T15:31:28.732Z
 *       token:
 *          type: string
 *          example: eyJhbGciOiJIUODkwfSwiY2FyIjp7ImJyYW5kIZXN0LmNvW5zZUltYWPV3QQZuTd3ciEzvNPDZb
 * 
 * 
 * 
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
 *   driver-registration-success:
 *      type: string
 *      example: Driver registration was successful!
 *   driver-registration-Conflict:
 *      type: string
 *      example: Phone number or license plate number already exists!
 *   driver-registration-server-error:
 *      type: string
 *      example: You will get the error messege in return
 *   driver-login-error-user:
 *      type: string
 *      example: User not found!
 *   driver-login-error-password:
 *      type: string
 *      example: Incorrect Email/Password!
 */

/** 
 * @swagger
 * /drivers/registerDriver:
 *   post:
 *     tags:
 *       - Register drivers
 *     description: Driver will register their account. Duplicate phone number and license plate number will be rejected 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Driver Info
 *         description: driver info object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Driver'
 *     responses:
 *       201:
 *         description: A success message
 *         schema:
 *           $ref: '#/definitions/driver-registration-success'
 *       409:
 *         description: Conflits with existing user
 *         schema:
 *           $ref: '#/definitions/driver-registration-Conflict'
 *       500:
 *         description: Server failure
 *         schema:
 *           $ref: '#/definitions/driver-registration-server-error'
 */

/**
 * @swagger
 * /drivers/loginDriver:
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
 *           $ref: '#/definitions/driver_login_request'
 *     responses:
 *       200:
 *         description: Driver info with a token
 *         schema:
 *           $ref: '#/definitions/driver_login_response'
 *       500:
 *         description: Server failure
 *         schema:
 *           $ref: '#/definitions/driver-registration-server-error'
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/driver-login-error-user'
 *       401:
 *         schema:
 *           $ref: '#/definitions/driver-login-error-password'
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