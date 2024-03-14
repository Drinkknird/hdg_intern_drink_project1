// **ดึงข้อมูลตะกร้าของผู้ใช้**
const show = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.productId');
    res.json(cart);
};

// **เพิ่มสินค้าลงในตะกร้า**
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        // สร้างตะกร้าใหม่
        const newCart = new Cart({
            user: req.user._id,
            items: [{ productId, quantity }],
        });
        await newCart.save();
        res.json(newCart);
    } else {
        // เพิ่มสินค้าลงในตะกร้าที่มีอยู่
        const existingItem = cart.items.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.json(cart);
    }
};

// **ลบสินค้าออกจากตะกร้า**
const deleteCartItem = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    const itemToRemove = cart.items.find(item => item._id === req.params.itemId);
    if (!itemToRemove) {
        res.status(400).json({ message: 'Item not found in cart' });
        return;
    }
    cart.items.pull(itemToRemove._id);
    await cart.save();
    res.json(cart);
};

// **ล้างตะกร้า**
const clearCart = async (req, res) => {
    await Cart.findByIdAndDelete(req.user._id);
    res.json({ message: 'Cart cleared successfully' });
};

module.exports = {
    show,
    addToCart,
    deleteCartItem,
    clearCart,
};
