# Backend API
MongoDB passward is not included. To run the program locally get password and add to config->db.js->paste in the password field


## Run
Clone the project then do `npm i`
then do `npm start` to run the server.

## REST API List

### GET

1. https://comingoo.herokuapp.com/riders/getAllriders
2. https://comingoo.herokuapp.com/drivers/getAlldriver


### POST

1. https://comingoo.herokuapp.com/drivers/addDriver 
2. https://comingoo.herokuapp.com/drivers/loginDriver 
3. https://comingoo.herokuapp.com/drivers/registerDriver
4. https://comingoo.herokuapp.com/riders/addRider
5. https://comingoo.herokuapp.com/riders/registerRider
6. https://comingoo.herokuapp.com/riders/loginDriver

# SWAGGER API DOCUMENTATION

### Installation Process 
1. Run `npm npm install swagger-jsdoc --save` to install swagger-jsdoc
2. Run `node server.js` to start server if server is off
3. Go to `http://127.0.0.1:3030/api-docs/` which will show API documentation view
4. To create documentation for API, open `index.js` in routes folder. At the top, create model definition and API information with path. You find example there.  

