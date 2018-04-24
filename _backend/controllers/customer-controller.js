var sql = require('mssql');
require('dotenv').load();

const config = new sql.ConnectionPool({
    server: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});

// function index(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the GetCustomers stored procedure (returns active and non-active customers)
//         request.execute("GetCustomers", function (err, result) {
//             if (err) {
//                 res.status(500).json({ message: 'An error occurred on the server.' });
//             }
//             else if (result.recordset.length == 0) {
//                 res.status(404).json({ message: 'There were no records found.' });
//             }
//             else {
//                 res.json(result.recordset);
//             }
//             config.close();
//         });
//     });
// }

function getActiveCustomers(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: err });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetActiveCustomers stored procedure
        request.execute("GetActiveCustomers", function (err, result) {
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
        // Execute the GetCustomerById stored procedure
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("GetCustomerById", function (err, result) {
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
        // Execute the GetCustomerByEmail stored procedure
        // Stored procedure parameter needed: Email
        request.input('Email', sql.VarChar, req.params.email);
        request.execute("GetCustomerByEmail", function (err, result) {
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

function getByCompany(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetCustomerByCompany stored procedure
        // Stored procedure parameter needed: Company
        request.input('Company', sql.VarChar, req.params.company);
        request.execute("GetCustomerByCompany", function (err, result) {
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
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the CreateCustomer stored procedure
        // Stored procedure parameters needed: FirstName, LastName, Company, Email, Phone
        //  AreaOfInterest, HeardAbout, Referral
        request.input('FirstName', sql.VarChar, req.body.FirstName);
        request.input('LastName', sql.VarChar, req.body.LastName);
        request.input('Company', sql.VarChar, req.body.Company);
        request.input('Email', sql.VarChar, req.body.Email);
        request.input('Phone', sql.VarChar, req.body.Phone);
        request.input('AreaOfInterest', sql.VarChar, req.body.AreaOfInterest);
        request.input('HeardAbout', sql.VarChar, req.body.HeardAbout);
        request.input('Referral', sql.VarChar, req.body.Referral);
        request.execute("CreateCustomer", function (err, result) {
            if (err) {
                res.status(500).json({ message:  'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {                
                res.status(200).json(result.recordset);
            }
            config.close();
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
        // Execute the UpdateCustomer stored procedure
        // Stored procedure parameters needed: ID, FirstName, LastName, Company, Email, Phone
        //  AreaOfInterest, HeardAbout, Referral, ActiveFlag
        request.input('Id', sql.Int, req.params.id);
        request.input('FirstName', sql.VarChar, req.body.FirstName);
        request.input('LastName', sql.VarChar, req.body.LastName);
        request.input('Company', sql.VarChar, req.body.Company);
        request.input('Email', sql.VarChar, req.body.Email);
        request.input('Phone', sql.VarChar, req.body.Phone);
        request.input('AreaOfInterest', sql.VarChar, req.body.AreaOfInterest);
        request.input('HeardAbout', sql.VarChar, req.body.HeardAbout);
        request.input('Referral', sql.VarChar, req.body.Referral);
        request.input('ActiveFlag', sql.Bit, req.body.ActiveFlag);
        request.execute("UpdateCustomer", function (err, result) {
            if (err) {
                res.status(500).json({ message:  'An error occurred on the server.' });
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
        // Execute the DeleteCustomerById stored procedure. Sets the Customer's ActiveFlag to 0 (inactive)
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("DeleteCustomerById", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.json({ message: 'Customer account is now inactive.' });
            }
            config.close();
        });
    });
}


module.exports = {
    // index,
    getActiveCustomers,
    getById,
    getByEmail,
    getByCompany,
    create,
    update,
    destroy
}