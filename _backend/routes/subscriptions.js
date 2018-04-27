var express = require('express');
var router = express.Router();

var cors = require('cors')
router.use(cors())

const subscriptionController = require('../controllers/subscription-controller');

// router.use(function(req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   });


router.get('/:hashedemail', subscriptionController.getByEmail);
router.post('/', subscriptionController.create);
router.put('/:hashedemail', subscriptionController.update);
router.delete('/unsubscribe/:hashedemail', subscriptionController.unsubscribe);

module.exports = router;