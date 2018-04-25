var express = require('express');
var router = express.Router();

var cors = require('cors')
router.use(cors())

const activityController = require('../controllers/activity-controller');


router.get('/', activityController.index );
router.get('/id/:id', activityController.getById);
router.get('/customer/:id', activityController.getByCustomerId);
router.get('/source/:source', activityController.getByCustomerSource);

router.post('/', activityController.create);

router.put('/:id', activityController.update);

router.delete('/:id', activityController.destroy);

module.exports = router;