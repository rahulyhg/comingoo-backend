var mongoose = require('mongoose');

const userName = "comingoo";
const password = "";
const server = "cluster0-gznwz.mongodb.net";
const database = "test";

const dev_db_url = `mongodb+srv://${userName}:${password}@${server}/${database}?retryWrites=true`;




let mongoDB = process.env.MONGODB_URI || dev_db_url;
const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true
};

mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;

module.exports = mongoose;