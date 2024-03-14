const router = require('express').Router();

router.post('/register', require('../controllers/UserController').register);
router.post('/login', require('../controllers/UserController').login);
router.get('/:id', require('../controllers/UserController').show);
router.put('/:id', require('../controllers/UserController').update);
router.delete('/:id', require('../controllers/UserController').destroy);

const UserController = require('../controllers/UserController');

router.post('/create', UserController.createUser);

module.exports = router;

