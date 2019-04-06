var mongoose = require('mongoose');

const username = "comingoo";
const password = "comingoo123";
const server = "cluster0-gznwz.mongodb.net";
const database = "test";



const dev_db_url = `mongodb+srv://${username}:${password}@${server}/${database}?retryWrites=true`;




const mongoDB = process.env.MONGODB_URI || dev_db_url;

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true
};

mongoose.connect(mongoDB, options);
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = mongoose;