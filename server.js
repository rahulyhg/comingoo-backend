const express = require('express');
const mongoose = require('./config/db');
const bodyParser = require("body-parser");
const socketIO = require('socket.io');
const http = require('http');
const router = require('./routes/index');
const swagger = require('./swagger');


const app = express();
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//Database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db connected!");
    
});

new swagger(app) ;

//default port 3030
const PORT = process.env.PORT || 3030 ;
app.listen(PORT, () =>{console.log(`Listening on ${ PORT }`) } );



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











  


  



















