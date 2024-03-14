const Order = require('../models/order.model');

// **สร้าง Order จากตะกร้า**
const createOrder = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(400).json({ message: 'Cart is empty' });
        return;
    }
    const order = new Order({
        user: req.user._id,
        items: cart.items,
        total: cart.total,
    });
    await order.save();
    // ล้างตะกร้า
    await Cart.findByIdAndDelete(cart._id);
    res.json(order);
};

// **ดึงข้อมูล Order ทั้งหมดของผู้ใช้**
const index = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// **ดึงข้อมูล Order by ID**
const show = async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
};

// **ลบ Order by ID**
const destroy = async (req, res) => {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
};

module.exports = {
    createOrder,
    index,
    show,
    destroy,
};
