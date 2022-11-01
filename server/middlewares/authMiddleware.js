const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from headers
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await UserModel.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            next(err);
            throw new Error('Not authorized!');
        }
    }

    if (!token) {
        res.status(401);
        next(err);
        throw new Error('Not authorized, no token!');
    }
};

module.exports = { protect };
