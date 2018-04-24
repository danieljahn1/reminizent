var sql = require('mssql');

const config = new sql.ConnectionPool ({
    server: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
});

// config.Promise = global.Promise;

// config.connect(function(err) {
//     if(err) {
//         console.log("MSSQL Error");
//         return;
//     }

//     console.log("Connected to MSSQL");
// })
