var request = require('superagent');

var mailchimpInstance = process.env.MAILCHIMP_INSTANCE,
    listUniqueId = process.env.MAILCHIMP_LIST_UID,
    mailchimpApiKey = process.env.MAILCHIMP_API_KEY;

function getByEmail(req, res) {
    request
        .get('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/' + req.params.hashedemail)
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
        .end(function (err, response) {
            if (response.status < 300) {
                res.send(response.body);
            } else if (response.status === 400 && response.body.title === "Member Exists") {
                res.send('Bad request');

            } else {
                res.send('Eamil not found :(');
            }
        });
}

function create(req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
        .send(req.body)
        .end(function (err, response) {
            if (response.status < 300) {
                res.send('Signed Up!');
            } else if (response.status === 400 && response.body.title === "Member Exists") {
                res.send('Email already exists');

            } else {
                res.send('Sign Up Failed :(');
            }
        });
}

function update(req, res) {
    request
        .put('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/' + req.params.hashedemail)
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
        .send(req.body)
        .end(function (err, response) {
            if (response.status < 300) {
                res.send(response.body);
            } else if (response.status === 400 && response.body.title === "Member Exists") {
                res.send('Bad request');

            } else {
                res.send('Eamil not found :(');
            }
        });
}

module.exports = {
    getByEmail,
    create,
    update
}