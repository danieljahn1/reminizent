var express = require('express');
var router = express.Router();
const campaignSentController = require('../controllers/campaignsent-controller');


router.get('/', campaignSentController.index );
router.get('/id/:id', campaignSentController.getById);
router.get('/campaign/:id', campaignSentController.getByCampaignId);
router.get('/customer/:id', campaignSentController.getByCustomerId);

router.post('/', campaignSentController.create);

router.put('/:id', campaignSentController.update);

router.delete('/:id', campaignSentController.destroy);

module.exports = router;