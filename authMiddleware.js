const jwt = require('jsonwebtoken');
const { getUser } = require('./controller.js');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized if no authorization header
    }
    
    const token = authHeader.split(' ')[1]; // Extract the token part from 'Bearer <token>'
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token part
    }
    
    try {
        const data = jwt.verify(token, "cCc"); // Verify the token
        const user = getUser(data.username); // Get the user based on the data from the token
        if (!user) {
            return res.sendStatus(401); // Unauthorized if user not found
        }
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.sendStatus(403); // Forbidden if token is invalid
    }
};
