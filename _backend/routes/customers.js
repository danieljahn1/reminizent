var express = require('express');
var router = express.Router();
const custController = require('../controllers/customer-controller');


router.get('/', custController.index );
// router.get('/id/:id', custController.getById);
// router.get('/email/:email', custController.getByEmail);

// router.post('/', custController.create);

// router.put('/:id', custController.update);

// router.delete('/:id', custController.destroy);

module.exports = router;