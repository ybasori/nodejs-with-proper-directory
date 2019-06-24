const mysql      = require('mysql');
const db_config = require(`../../configs/database.js`);


module.exports =  mysql.createConnection(db_config);