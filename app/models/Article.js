const db = require(`../libraries/Db.js`);
const dt = require(`../libraries/Date.js`);

const table_article = "articles";

module.exports={
    save: function(data, cb){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        delete data._csrf;
        db.query(`INSERT INTO ${table_article} SET ?`, data, cb);
    },
    getAll: function(limit, offset, cb){
        db.query(`SELECT * FROM ${table_article} LIMIT ${limit} OFFSET ${offset}`, cb);
    }
}