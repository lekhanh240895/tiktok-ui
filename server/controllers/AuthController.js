const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

// Generator JWT
function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

class AuthController {
    // [POST] /auth/login
    async login(req, res, next) {
        try {
            const { email, username, password } = req.body;

            // Check for user email or username
            const user =
                (await UserModel.findOne({ email })) ||
                (await UserModel.findOne({ username }));

            if (!user) {
                res.status(400);
                throw new Error('Error: User not found!');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                res.status(400);
                throw new Error('Error: Incorrect password!');
            }

            if (user && validPassword) {
                res.status(200).json({
                    ...user._doc,
                    token: generateToken(user._id),
                });
            }
        } catch (err) {
            next(err);
        }
    }

    // [POST] /auth/register
    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400);
                throw new Error('Error: Please add all fields!');
            }

            // Check if user exists
            const userExists = await UserModel.findOne({ email });
            if (userExists) {
                res.status(400);
                throw new Error('Error: User already exists!');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            // Create user
            const user = new UserModel({
                ...req.body,
                full_name: username,
                password: hashPassword,
            });

            if (!user) {
                res.status(400);
                throw new Error('Error: Invalid data!');
            }

            await user.save();
            res.status(200).json({
                user,
                token: generateToken(user._id),
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
