const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    );
};



// 🧾 Register User
const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body;

        // ✅ Check required fields
        if (!firstName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // ✅ Check if user already exists
        const userExists = await User.findOne({
            email
        });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // ✅ Create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// 🔐 Login User
const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // ✅ Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // ✅ Check user existence
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // ✅ Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // ✅ Generate token
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// ✅ Export both functions
module.exports = {
    registerUser,
    loginUser
};