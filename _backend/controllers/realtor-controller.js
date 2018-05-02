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
        // Execute the GetRealtors stored procedure (returns all non-deleted Realtor records)
        request.execute("GetRealtors", function (err, result) {
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
        // Execute the GetRealtorById stored procedure
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("GetRealtorById", function (err, result) {
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
        // Execute the CreateRealtor stored procedure
        // Stored procedure parameters needed: RealtorName
        request.input('RealtorName', sql.VarChar, req.body.RealtorName);
        request.execute("CreateRealtor", function (err, result) {
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
        // Execute the UpdateRealtor stored procedure
        // Stored procedure parameters needed: ID, RealtorName
        request.input('Id', sql.Int, req.params.id);
        request.input('RealtorName', sql.VarChar, req.body.RealtorName);
        request.execute("UpdateRealtor", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset == undefined) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                console.log(result);         
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
        // Execute the DeleteRealtorById stored procedure. Sets the ActiveFlag to 0 (false)
        // Stored procedure parameter needed: Id
        request.input('Id', sql.Int, req.params.id);
        request.execute("DeleteRealtorById", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            // else if (result.recordset.length == 0) {
            //     res.status(404).json({ message: 'There were no records found.' });
            // }
            else {
                res.json({ message: 'Customer activity record has been removed.' });
            }
            config.close();
        });
    });
}


module.exports = {
    index,
    getById,
    create,
    update,
    destroy
}