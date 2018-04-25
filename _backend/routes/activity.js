var express = require('express');
var router = express.Router();

var cors = require('cors')
router.use(cors())

const activityController = require('../controllers/activity-controller');

var configjs = require('../config/config');
var jwt = require('jsonwebtoken'); 
var app = express();
app.set('superSecret', configjs.secret);

router.post('/', activityController.create);

// route middleware to verify a token
// router.use(function(req, res, next) {

//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
  
//     // decode token
//     if (token) {
  
//       // verifies secret and checks exp
//       jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//         if (err) {
//           return res.json({ success: false, message: 'Failed to authenticate token.' });    
//         } else {
//           // if everything is good, save to request for use in other routes
//           req.decoded = decoded;    
//           next();
//         }
//       });
  
//     } else {
  
//       // if there is no token
//       // return an error
//       return res.status(403).send({ 
//           success: false, 
//           message: 'No token provided.' 
//       });
  
//     }
//   });

router.get('/', activityController.index );
router.get('/id/:id', activityController.getById);
router.get('/customer/:id', activityController.getByCustomerId);
router.get('/source/:source', activityController.getByCustomerSource);

router.put('/:id', activityController.update);

router.delete('/:id', activityController.destroy);

module.exports = router;