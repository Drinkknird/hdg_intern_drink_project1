const User = require('../models/user.model');

const bcrypt = require('bcrypt'); // Install bcrypt for password hashing

const createUser = async (req, res) => {
    try {
        // Validate user input (optional)
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(), // Ensure lowercase for case-insensitive comparison
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', data: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the user' });
    }
};





// **ลงทะเบียนผู้ใช้ใหม่**
const register = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
};

// **เข้าสู่ระบบ**
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json(user);
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
    register,
    login,
    show,
    update,
    destroy,
};
