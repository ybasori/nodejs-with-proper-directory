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
    getAll: function(select, limit, offset, cb){
        db.query(`SELECT ${select} FROM ${table_article} LIMIT ${limit} OFFSET ${offset}`, cb);
    },
    getById: function(select, id, cb){
        db.query(`SELECT ${select} FROM ${table_article} WHERE id="${id}" LIMIT 1`, cb);
    },
    update: function(data, id, cb){
        data.updated_at = dt.now();
        delete data._csrf;
        db.query(`UPDATE ${table_article} SET ? WHERE id='${id}'`, data, cb);

    }
}