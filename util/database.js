const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodejs2',
    database: 'node_complete',
    password: 'nodecomplete'
    //your new password
});

module.exports = pool.promise();