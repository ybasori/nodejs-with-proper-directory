const mysql      = require('mysql');
const db_config = require(`../../configs/database.js`);
const util = require('util');

const conn = mysql.createConnection(db_config);


module.exports =  {
    connect: function(cb){
        return conn.connect(cb)
    },
    query: util.promisify(conn.query).bind(conn)
}