var express = require('express');
var router = express.Router();

var cors = require('cors')
router.use(cors())

const custController = require('../controllers/customer-controller');


// router.get('/', custController.index );
router.get('/active', custController.getActiveCustomers );
router.get('/id/:id', custController.getById);
router.get('/email/:email', custController.getByEmail);
router.get('/company/:company', custController.getByCompany);

router.post('/', custController.create);

router.put('/:id', custController.update);

router.delete('/:id', custController.destroy);

module.exports = router;