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
