const router = require('express').Router();

router.post('/orders', require('../controllers/OrderController').createOrder);
router.get('/orders', require('../controllers/OrderController').index);
router.get('/orders/:id', require('../controllers/OrderController').show);
router.delete('/orders/:id', require('../controllers/OrderController').destroy);

module.exports = router;
