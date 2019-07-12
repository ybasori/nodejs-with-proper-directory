const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_profile = "profiles";

module.exports = {
    getByUserId: async function(select, user_id){
        return await db.query(`SELECT ${select} FROM ${table_profile} WHERE user_id=${user_id} LIMIT 1`);
    },
    save: async function(data){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        return await db.query(`INSERT INTO ${table_profile} SET ?`, data);
    },
    update: async function(data, user_id){
        data.updated_at = dt.now();
        return await db.query(`UPDATE ${table_profile} SET ? WHERE user_id="${user_id}"`, data);
    }
}