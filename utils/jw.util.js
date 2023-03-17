const jwt = require('jsonwebtoken');

function generateToken(email) {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
    return token;
}

module.exports = { generateToken };