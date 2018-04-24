var sql = require('mssql');
require('dotenv').load();

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
        // Execute the GetContactActivity stored procedure (all non-deleted ContactActivity records)
        request.execute("GetContactActivity", function (err, result) {
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
        // Execute the GetContactActivityById stored procedure
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("GetContactActivityById", function (err, result) {
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

function getByCustomerId(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetContactActivityByCustomerId stored procedure
        // Stored procedure parameter needed: Id
        request.input('CustomerId', sql.Int, req.params.id);
        request.execute("GetContactActivityByCustomerId", function (err, result) {
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

function getByAdminId(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetContactActivityByAdminId stored procedure
        // Stored procedure parameter needed: Id
        request.input('AdminId', sql.Int, req.params.id);
        request.execute("GetContactActivityByAdminId", function (err, result) {
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

function getByContactMethod(req, res) {
    // Connect to the MSSQL db
    config.connect(function (err) {
        if (err) {
            res.status(500).json({ message: 'An error occurred on the server.' });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetActivityByContactMethod stored procedure
        // Stored procedure parameter needed: ContactMethod
        request.input('ContactMethod', sql.VarChar, req.params.contactmethod);
        request.execute("GetActivityByContactMethod", function (err, result) {
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
        // Execute the CreateContactActivity stored procedure
        // Stored procedure parameters needed: AdminId, CustomerId, DateContacted, ContactMethod, ContactMessage
        request.input('AdminId', sql.Int, req.body.AdminID);
        request.input('CustomerId', sql.Int, req.body.CustomerID);
        request.input('DateContacted', sql.VarChar, req.body.DateContacted);
        request.input('ContactMethod', sql.VarChar, req.body.ContactMethod);
        request.input('ContactMessage', sql.VarChar, req.body.ContactMessage);
        request.execute("CreateContactActivity", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset == undefined) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.status(200).json({ message: 'Record added successfully.' });
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
        // Execute the UpdateContactActivity stored procedure
        // Stored procedure parameters needed: ID, AdminId, CustomerId, DateContacted, ContactMethod, ContactMessage
        request.input('Id', sql.Int, req.params.id);
        request.input('AdminId', sql.Int, req.body.AdminID);
        request.input('CustomerId', sql.Int, req.body.CustomerID);
        request.input('DateContacted', sql.VarChar, req.body.DateContacted);
        request.input('ContactMethod', sql.VarChar, req.body.ContactMethod);
        request.input('ContactMessage', sql.VarChar, req.body.ContactMessage);
        request.execute("UpdateContactActivity", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset == undefined) {
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
        // Execute the DeleteContactActivityById stored procedure. Sets the deleteflag to 1 (true)
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("DeleteContactActivityById", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.json({ message: 'Contact activity record has been removed.' });
            }
            config.close();
        });
    });
}


module.exports = {
    index,
    getById,
    getByCustomerId,
    getByAdminId,
    getByContactMethod,
    create,
    update,
    destroy
}