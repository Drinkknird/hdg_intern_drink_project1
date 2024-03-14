// const express = require('express');
// const router = express.Router();

// const postController = require('../controllers/post.controller');

// router.post('/', postController.createPost);
// router.get('/', postController.getAllPosts);
// router.get('/:id', postController.getPostById);
// router.put('/:id', postController.updatePost);
// router.delete('/:id', postController.deletePost);
// router.delete('/', postController.deleteAllPosts); // เพิ่มเส้นทาง delete ทั้งหมด

// module.exports = router;

const router = require('express').Router();

router.get('/post', require('../controllers/post.controller').index);
router.get('/post/:id', require('../controllers/post.controller').show);
router.post('/post', require('../controllers/post.controller').create);
router.put('/post/:id', require('../controllers/post.controller').update);
router.delete('/post/:id', require('../controllers/post.controller').destroy);

module.exports = router;

