const Post = require('../models/post.model');

const createPost = async (req, res) => {
    const { title, content } = req.body;

    const post = new Post({
        title,
        content,
    });

    await post.save();

    res.status(201).json({
        success: true,
        data: post,
    });
};

const getAllPosts = async (req, res) => {
    const posts = await Post.find();

    res.status(200).json({
        success: true,
        data: posts,
    });
};

const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }

    res.status(200).json({
        success: true,
        data: post,
    });
};

const updatePost = async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(req.params.id, {
        title,
        content,
    });

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }

    res.status(200).json({
        success: true,
        data: post,
    });
};

const deletePost = async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: 'Post not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
    });
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
