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
        // Execute the GetActiveCustomers stored procedure
        request.execute("GetActiveCustomers", function (err, result) {
            if (err) {
                res.status(500).json({ message: 'An error occurred on the server.' });
            }
            else if (!result) {
                res.status(404).json({ message: 'There were no records found.' });
            }
            else {
                res.json(result.recordset);
            }
            config.close();
        });
    });
}


module.exports = {
    index
}