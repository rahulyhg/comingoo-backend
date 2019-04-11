const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function(password) {

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}