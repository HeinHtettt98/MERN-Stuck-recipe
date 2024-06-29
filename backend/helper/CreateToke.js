const jwt = require('jsonwebtoken');
const age = 3*24*60*60
module.exports = function (id) {
    return jwt.sign({id},'My12345%',{expiresIn: age })
}