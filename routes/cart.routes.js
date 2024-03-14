const router = require('express').Router();

router.get('/cart', require('../controllers/CartController').show);
router.post('/cart/add', require('../controllers/CartController').addToCart);
router.delete('/cart/:itemId', require('../controllers/CartController').deleteCartItem);
router.delete('/cart/clear', require('../controllers/CartController').clearCart);

module.exports = router;
