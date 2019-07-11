const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_userfile = "user_images";

module.exports = {
    save: async function(data){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        return await db.query(`INSERT INTO ${table_userfile} SET ?`, data);
    },
    getAllbyUserId: async function(select, user_id, limit, offset){
        return await db.query(`SELECT ${select} FROM ${table_userfile} WHERE user_id="${user_id}" ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`);
    },
    getAllTotalbyUserId: async function(user_id){
        return await db.query(`SELECT COUNT(*) AS total FROM ${table_userfile} WHERE user_id="${user_id}"`);
    }
}