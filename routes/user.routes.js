const router = require('express').Router();

router.get('/:id', require('../controllers/UserController').show);
router.put('/:id', require('../controllers/UserController').update);
router.delete('/:id', require('../controllers/UserController').destroy);

const authController = require('../controllers/UserController');
router.post('/login', authController.login);

const UserController = require('../controllers/UserController');
router.post('/create', UserController.createUser);

module.exports = router;

