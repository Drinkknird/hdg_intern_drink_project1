const auth = require('../middleware/auth');

// **ตรวจสอบว่าผู้ใช้ login หรือไม่**
const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

// **ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่**
const isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = {
    isLoggedIn,
    isAdmin,
};
