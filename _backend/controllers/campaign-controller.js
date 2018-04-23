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
            res.status(500).json({ message: err });
            return;
        }

        var request = new sql.Request(config);
        // Execute the GetCampaigns stored procedure (returns all non-deleted campaign records)
        request.execute("GetCampaigns", function (err, result) {
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

// function getById(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the GetActivityById stored procedure
//         // Stored procedure parameter needed: Id
//         request.input('Id', sql.Int, req.params.id);
//         request.execute("GetActivityById", function (err, result) {
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

// function getByAdminId(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the GetContactActivityByAdminId stored procedure
//         // Stored procedure parameter needed: Id
//         request.input('AdminId', sql.Int, req.params.id);
//         request.execute("GetContactActivityByAdminId", function (err, result) {
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

// function create(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the CreateCustomerActivity stored procedure
//         // Stored procedure parameters needed: CustomerId, DateCreated, DateLastContacted, Source
//         request.input('CustomerId', sql.Int, req.body.CustomerID);
//         request.input('DateCreated', sql.VarChar, req.body.DateCreated);
//         request.input('DateLastContacted', sql.VarChar, req.body.DateLastContacted);
//         request.input('Source', sql.VarChar, req.body.Source);
//         request.execute("CreateCustomerActivity", function (err, result) {
//             if (err) {
//                 res.status(500).json({ message: 'An error occurred on the server.' });
//             }
//             // else if (result.recordset == undefined) {
//             //     res.status(404).json({ message: 'There were no records found.' });
//             // }
//             else {
//                 res.status(200).json({ message: 'Record added successfully.' });
//             }
//             config.close();
//         });
//     });
// }

// function update(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the UpdateCustomerActivity stored procedure
//         // Stored procedure parameters needed: ID, CustomerId, DateCreated, DateLastContacted, Source
//         request.input('Id', sql.Int, req.params.id);
//         request.input('CustomerId', sql.Int, req.body.CustomerID);
//         request.input('DateCreated', sql.VarChar, req.body.DateCreated);
//         request.input('DateLastContacted', sql.VarChar, req.body.DateLastContacted);
//         request.input('Source', sql.VarChar, req.body.Source);
//         request.execute("UpdateCustomerActivity", function (err, result) {
//             if (err) {
//                 res.status(500).json({ message: 'An error occurred on the server.' });
//             }
//             // else if (result.recordset == undefined) {
//             //     res.status(404).json({ message: 'There were no records found.' });
//             // }
//             else {
//                 console.log(result);         
//                 res.status(200).json({ message: 'Record updated successfully.' });
//             }
//             config.close();
//         });
//     });
// }

// function destroy(req, res) {
//     // Connect to the MSSQL db
//     config.connect(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'An error occurred on the server.' });
//             return;
//         }

//         var request = new sql.Request(config);
//         // Execute the DeleteCustomerActivityById stored procedure. Sets the deleteflag to 1 (true)
//         // Stored procedure parameter needed: Id
//         request.input('Id', sql.Int, req.params.id);
//         request.execute("DeleteCustomerActivityById", function (err, result) {
//             if (err) {
//                 res.status(500).json({ message: 'An error occurred on the server.' });
//             }
//             // else if (result.recordset.length == 0) {
//             //     res.status(404).json({ message: 'There were no records found.' });
//             // }
//             else {
//                 res.json({ message: 'Customer activity record has been removed.' });
//             }
//             config.close();
//         });
//     });
// }


module.exports = {
    index
    // getById,
    // getByAdminId
    // create,
    // update,
    // destroy
}