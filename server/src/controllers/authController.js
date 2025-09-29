// server/src/controllers/authController.js

import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

//~---------- SignUp Controller -----------------
// In server/src/controllers/authController.js

export const SignUp = async (req, res) => {
    try {
        // location is now optional, so it might be undefined
        const { name, email, password, location } = req.body;

        // --- THE FIX IS HERE ---
        // We remove 'location' from the required fields check
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide name, email, and password." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Mongoose will simply ignore 'location' if it's undefined
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            location,
        });

        // ... the rest of the function remains the same ...
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax',
        });

        res.status(201).json({
            success: true,
            message: "Signup Successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
//~---------- Login Controller -----------------
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // --- THE FIX IS HERE ---
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Correctly handles http vs https
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax', // Use 'lax' for development and general use
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: userResponse // <-- Send the complete user object
        });

       

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

//~---------- LogOut Controller -----------------
export const Logout = async (req, res) => {
    // --- THE FIX IS HERE ---
    // The options for clearing a cookie must match the options used to set it.
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
        success: true,
        message: "Logout Successful"
    });
};