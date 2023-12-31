const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '3m' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
}