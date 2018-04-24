var express = require('express');
var router = express.Router();
const campaignController = require('../controllers/campaign-controller');


router.get('/', campaignController.index );
router.get('/id/:id', campaignController.getById);
router.get('/admin/:id', campaignController.getByAdminId);

router.post('/', campaignController.create);

router.put('/:id', campaignController.update);

router.delete('/:id', campaignController.destroy);

module.exports = router;