var sql = require('mssql');
require('dotenv').load();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); 

var configjs = require('../config/config');
var express = require('express');
var app = express();
app.set('superSecret', configjs.secret);

const config = new sql.ConnectionPool({
    server: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});

function index(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetAdmins stored procedure
        request.execute("GetAdmins", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            else if (result.recordset.length == 0) {
                res.status(404).json({ message: 'There were no records found.' });
            }
            else {
                res.json(result.recordset);
            }
            config.close();
        });
    });
}

function getById(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetAdminById stored procedure
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("GetAdminById", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            else if (result.recordset.length == 0) {
                res.status(404).json({ message: 'There were no records found.' });
            }
            else {
                res.json(result.recordset);
            }
            config.close();
        });
    });
}

function getByEmail(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetAdminByEmail stored procedure
        // Stored procedure parameter needed: Email
        request.input('Email', sql.VarChar, req.params.email);
        request.execute("GetAdminByEmail", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            else if (result.recordset.length == 0) {
                res.status(404).json({ message: 'There were no records found.' });
            }
            else {
                res.json(result.recordset);
            }
            config.close();
        });
    });
}

function create(req, res) {
    // Hash and salt the password
    bcrypt.genSalt(12, function(err, salt) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        bcrypt.hash(req.body.Password, salt, function(err, hash) {
            // Store the hashed password in MSSQL
            // console.log("hash- " + hash);

            // Connect to the MSSQL db
            config.connect(function (err) {
                if (err) {
                    res.status(500).json({ message: 'An error occurred on the server.' });
                    return;
                }

                var request = new sql.Request(config);
                // Execute the CreateAdminAccount stored procedure
                // Stored procedure parameters needed: Email, Password (encrypt), Role
                request.input('Email', sql.VarChar, req.body.Email);
                request.input('Password', sql.VarChar, hash); //req.body.Password
                request.input('Role', sql.VarChar, req.body.Role);
                request.execute("CreateAdminAccount", function (err, result) {
                    if (err) {
                        res.status(500).json({ message:  'An error occurred on the server.' });
                    }
                    // else if (result.recordset.length == 0) {
                    //     res.status(404).json({ message: 'There were no records found.' });
                    // }
                    else {
                        res.status(200).json({ message: 'Record added successfully.' });
                    }
                    config.close();
                });
            });
        });
    });

}

function update(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the UpdateAdmin stored procedure
        // Stored procedure parameters needed: ID, Email, Password (encrypt), Role
        request.input('Id', sql.Int, req.params.id);
        request.input('Email', sql.VarChar, req.body.Email);
        request.input('Password', sql.VarChar, req.body.Password);
        request.input('Role', sql.VarChar, req.body.Role);
        request.execute("UpdateAdmin", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.status(200).json({ message: 'Record updated successfully.' });
            }
            config.close();
        });
    });
}

function destroy(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the DeleteAdminById stored procedure. Updates the ActiveFlag to 0 (inactive)
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("DeleteAdminById", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.json({ message: 'Admin account is now inactive.' });
            }
            config.close();
        });
    });
}

function login(req, res) {
    // Authenticate the user based on the email and password  'An error occurred on the server.'
     // Connect to the MSSQL db
     config.connect(function (err) {
        if (err) {
            res.status(500).json({ message:  err });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetLogin stored procedure.
        // Stored procedure parameter needed: Email
        request.input('Email', sql.VarChar, req.body.Email);
        request.execute("GetLogin", function (err, result) {
            if (err) {
                res.status(500).json({ message: err });
            }
            else if (result.recordset.length == 0) {
                res.status(404).json({ message: 'There were no records found.' });
            }
            else {
                
                // Compare the username and password
                bcrypt.compare(req.body.Password, result.recordset[0].Password, function(err, isMatch) {
                    if (isMatch) {                    
                        // Username and password match. Create token
                        const payload = {
                            admin: result.recordset[0].Email
                        };

                        var token = jwt.sign(payload, app.get('superSecret'), {
                            expiresIn: '1h' // expires in 1 hour
                          });                  
                  
                          // return the information including token as JSON
                          res.json({
                            success: true,
                            message: 'Here is your token.',
                            token: token
                          });
                   
                    }
                    else {
                        res.json({ success: false });
                    }
                })
                
            }
            config.close();
        });
    });
}


module.exports = {
    index,
    getById,
    getByEmail,
    create,
    update,
    destroy,
    login
}