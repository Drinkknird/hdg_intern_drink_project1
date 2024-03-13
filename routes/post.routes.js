const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.delete('/', postController.deleteAllPosts); // เพิ่มเส้นทาง delete ทั้งหมด

module.exports = router;
