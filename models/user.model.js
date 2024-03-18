const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Normalize email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to validate and hash password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
