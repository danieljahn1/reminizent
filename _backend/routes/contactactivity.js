var express = require('express');
var router = express.Router();
const contactActivityController = require('../controllers/contactactivity-controller');


router.get('/', contactActivityController.index );
router.get('/id/:id', contactActivityController.getById);
router.get('/customer/:id', contactActivityController.getByCustomerId);
router.get('/admin/:id', contactActivityController.getByAdminId);
router.get('/source/:contactmethod', contactActivityController.getByContactMethod);

router.post('/', contactActivityController.create);

router.put('/:id', contactActivityController.update);

router.delete('/:id', contactActivityController.destroy);

module.exports = router;