const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'nodejs2', 'nodecomplete', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'nodejs2',
//     database: 'node_complete',
//     password: 'nodecomplete'
//     //your new password
// });

// module.exports = pool.promise();