const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
            const user = await UserModel.findOne({
                $or: [{ email }, { username }],
            });

            if (!user) {
                res.status(400).json({
                    status: 400,
                    message: 'User not found!',
                });
                throw new Error('User not found!');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                res.status(400).json({
                    status: 400,
                    message: 'Incorrect password!',
                });
                throw new Error('Incorrect password!');
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
                res.status(400).json({
                    status: 400,
                    message: 'Please add all fields!',
                });
                throw new Error('Please add all fields!');
            }

            // Check if username exists
            const usernameExists = await UserModel.findOne({
                username,
            });

            if (usernameExists) {
                res.status(400).json({
                    status: 400,
                    message: 'Username already exists!',
                });
                throw new Error('Username already exists!');
            }

            // Check if email exists
            const emailExists = await UserModel.findOne({
                email,
            });

            if (emailExists) {
                res.status(400).json({
                    status: 400,
                    message: 'Email already exists!',
                });
                throw new Error('Email already exists!');
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
                throw new Error('Invalid data!');
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
