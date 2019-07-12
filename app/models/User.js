const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_user = "users";

module.exports = {
    getByEmail: async function(select, email){
        return await db.query(`SELECT ${select} FROM ${table_user} WHERE email="${email}" LIMIT 1`);
    },
    getById: async function(select, id){
        return await db.query(`SELECT ${select} FROM ${table_user} WHERE id="${id}" LIMIT 1`);
    },
    update: async function(data, id){
        data.updated_at = dt.now();
        return await db.query(`UPDATE ${table_user} SET ? WHERE id='${id}'`, data);
    }
}