const bcrypt = require('bcrypt'); // Install bcrypt for password hashing

const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', data: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating session' });
            }

            res.status(200).json({ message: 'Login successful', data: user });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// **ดึงข้อมูลผู้ใช้ by ID**
const show = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

// **อัปเดตข้อมูลผู้ใช้ by ID**
const update = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
};

// **ลบข้อมูลผู้ใช้ by ID**
const destroy = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
};

module.exports = {
    createUser,
    login,
    show,
    update,
    destroy,
};
