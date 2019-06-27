const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_article = "articles";

module.exports={
    save: async function(data){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        return await db.query(`INSERT INTO ${table_article} SET ?`, data);
    },
    getAll: async function(select, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_article} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getAllByUserId: async function(select, user_id, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE user_id = "${user_id}" ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getById: async function(select, id){
        return await db.query(`SELECT ${select} FROM ${table_article} WHERE id="${id}" LIMIT 1`);
    },
    updateById: async function(data, id){
        data.updated_at = dt.now();
        return await db.query(`UPDATE ${table_article} SET ? WHERE id='${id}'`, data);

    },
    deleteById: async function(id){
        return await db.query(`DELETE FROM ${table_article} WHERE id='${id}'`);
    },
    getByIdAsync: async function(){
        return await db.query('select * from articles');
    },
    checkUserId: async function(id, user_id){
        return await db.query(`SELECT COUNT(*) FROM ${table_article} WHERE id = "${id}" AND user_id = "${user_id}"  LIMIT 1`);
    }
}