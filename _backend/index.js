var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var app = express();
require('dotenv').load();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));

var mailchimpInstance   = process.env.MAILCHIMP_INSTANCE,
    listUniqueId        = process.env.MAILCHIMP_LIST_UID,
    mailchimpApiKey     = process.env.MAILCHIMP_API_KEY;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstname,
            'LNAME': req.body.lastname,
            'PHONE': req.body.phone,
            'COMPANY': req.body.company
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});