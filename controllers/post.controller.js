// // controllers/post.controller.js
// const Post = require('../models/post.model');

// const createPost = async (req, res) => {
//     const { title, content } = req.body;

//     const post = new Post({
//         title,
//         content,
//     });

//     try {
//         const savedPost = await post.save();
//         res.status(201).json({ success: true, data: savedPost });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };

// const getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.status(200).json({ success: true, data: posts });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const getPostById = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({ success: false, message: 'Post not found' });
//         }
//         res.status(200).json({ success: true, data: post });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const updatePost = async (req, res) => {
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedPost) {
//             return res.status(404).json({ success: false, message: 'Post not found' });
//         }
//         res.status(200).json({ success: true, data: updatedPost });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const deletePost = async (req, res) => {
//     try {
//         const deletedPost = await Post.findByIdAndDelete(req.params.id);
//         if (!deletedPost) {
//             return res.status(404).json({ success: false, message: 'Post not found' });
//         }
//         res.status(200).json({ success: true, message: 'Post deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const deleteAllPosts = async (req, res) => {
//     try {
//         await Post.deleteMany({});
//         res.status(200).json({ success: true, message: 'All posts deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// module.exports = {
//     createPost,
//     getAllPosts,
//     getPostById,
//     updatePost,
//     deletePost,
//     deleteAllPosts, // เพิ่มฟังก์ชัน deleteAllPosts ไปยัง module.exports
// };


const Post = require('../models/post.model');

// **ดึงข้อมูล Post ทั้งหมด**
const index = async (req, res) => {
    const posts = await Post.find().populate('author');
    res.json(posts);
};

// **ดึงข้อมูล Post by ID**
const show = async (req, res) => {
    const post = await Post.findById(req.params.id).populate('author');
    res.json(post);
};

// **สร้าง Post ใหม่**
const create = async (req, res) => {
    const post = new Post({ ...req.body, author: req.user._id });
    await post.save();
    res.json(post);
};

// **อัปเดต Post by ID**
const update = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json(post);
};

// **ลบ Post by ID**
const destroy = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
};

// **กด Like Post**
const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
        post.likes.push(req.user._id);
        await post.save();
    }
    res.json(post);
};

// **Unlike Post**
const unlikePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.likes.pull(req.user._id);
    await post.save();
    res.json(post);
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    likePost,
    unlikePost,
};
