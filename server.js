const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require("body-parser");
const socketIO = require('socket.io');
const http = require('http');
const router = require('./routes/index');
var swaggerJSDoc = require('swagger-jsdoc');


const app = express();
app.use(express.static(__dirname + '/public'));

// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Comingoo REST API List',
    version: '1.0.0',
    description: 'Here is the total list of APIs for COMINGOO app development',
  },
  host: 'localhost:3030',
  basePath: '/',
};
// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./**/routes/*.js','routes.js'],// pass all in array 
  };
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res) {  
   res.setHeader('Content-Type', 'application/json');   
   res.send(swaggerSpec); 
  });




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db connected!")
});



//default port 3030
const PORT = process.env.PORT || 3030 ;
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



app.use('/', router);

/*
//Socket.io implementation

var server = http.createServer(app);

const io = socketIO(server);

//import a socket and replace the (socket) with that

//Listener example
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

//Emmiter example
io.emit('time', new Date().toTimeString()), 1000);


// END
*/











  


  



















