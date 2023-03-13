const jwt = require('jsonwebtoken');

function generateToken(userFirstName, userLastName) {
    const token = jwt.sign({ firstName: userFirstName, lastName : userLastName }, process.env.JWT_SECRET_KEY);
    return token;
}

module.exports = { generateToken };