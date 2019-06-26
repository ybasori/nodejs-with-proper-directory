const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_article = "articles";

module.exports={
    save: async function(data, cb){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        delete data._csrf;
        return await db.query(`INSERT INTO ${table_article} SET ?`, data);
    },
    getAll: async function(select, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_article} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getById: async function(select, id, cb){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE id="${id}" LIMIT 1`);
    },
    updateById: async function(data, id, cb){
        data.updated_at = dt.now();
        delete data._csrf;
        return await db.query(`UPDATE ${table_article} SET ? WHERE id='${id}'`, data);

    },
    deleteById: async function(id, cb){
        return await db.query(`DELETE FROM ${table_article} WHERE id='${id}'`);
    },
    getByIdAsync: async function(){
        return await db.query('select * from articles');
    }
}