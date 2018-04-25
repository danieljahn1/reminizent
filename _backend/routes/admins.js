var express = require('express');
var router = express.Router();

var cors = require('cors')
router.use(cors())

const adminsController = require('../controllers/admins-controller');

// var auth = require('../controllers/auth');

router.get('/', adminsController.index );
router.get('/id/:id', adminsController.getById);
router.get('/email/:email', adminsController.getByEmail);

router.post('/login', adminsController.login);
router.post('/', adminsController.create);

router.put('/:id', adminsController.update);

router.delete('/:id', adminsController.destroy);

module.exports = router;