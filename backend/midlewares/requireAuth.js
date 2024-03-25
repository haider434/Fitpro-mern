const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    
    // Check if authorization header exists
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token is required' });
    }

    // Extract token from authorization header
    const token = authorization.split(' ')[1];
    try {
        // Verify the token
        const idToken = jwt.verify(token, process.env.SECRET);
        if (!idToken) {
            // Token verification failed
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        // Token is valid, extract user id from token
        const { _id } = idToken;
        // Find user in database using user id
        const user = await User.findOne({ _id }).select('_id');
        if (!user) {
            // User not found in database
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach user object to request for further processing
        req.user = user;
        // Proceed to the next middleware
        next();
    } catch (error) {
        // Error occurred during token verification or database operation
        console.error(error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
