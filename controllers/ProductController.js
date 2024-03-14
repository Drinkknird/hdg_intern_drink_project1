const product = require('../models/product.model');

// **ดึงข้อมูลสินค้าทั้งหมด**
const index = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

// **ดึงข้อมูลสินค้า by ID**
const show = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

// **ค้นหาสินค้า**
const search = async (req, res) => {
    const { query } = req.query;
    const products = await Product.find({ $text: { $search: query } });
    res.json(products);
};

// **สร้างสินค้าใหม่**
const create = async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
};

// **อัปเดตสินค้า by ID**
const update = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.json(product);
};

// **ลบสินค้า by ID**
const destroy = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
};

module.exports = {
    index,
    show,
    search,
    create,
    update,
    destroy,
};
