const db = require(`../libraries/Db.js`);

const dt = require(`../libraries/Date.js`);

const table_profile = "profiles";

module.exports = {
    getByUserId: async function(user_id){
        return await db.query(`SELECT * FROM ${table_profile} WHERE user_id=${user_id} LIMIT 1`);
    }
}