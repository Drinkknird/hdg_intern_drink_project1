const router = require('express').Router();

router.get('/products', require('../controllers/ProductController').index);
router.get('/products/:id', require('../controllers/ProductController').show);
router.get('/products/search', require('../controllers/ProductController').search);
router.post('/products', require('../controllers/ProductController').create);
router.put('/products/:id', require('../controllers/ProductController').update);
router.delete('/products/:id', require('../controllers/ProductController').destroy);

module.exports = router;
