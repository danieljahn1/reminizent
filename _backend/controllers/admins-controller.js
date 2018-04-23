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
        request.input('Password', sql.VarChar, req.body.Password);
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

module.exports = {
    index,
    getById,
    getByEmail,
    create,
    update,
    destroy
}