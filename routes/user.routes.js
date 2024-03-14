const router = require('express').Router();

router.post('/users/register', require('../controllers/UserController').register);
router.post('/users/login', require('../controllers/UserController').login);
router.get('/users/:id', require('../controllers/UserController').show);
router.put('/users/:id', require('../controllers/UserController').update);
router.delete('/users/:id', require('../controllers/UserController').destroy);

const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);

module.exports = router;

