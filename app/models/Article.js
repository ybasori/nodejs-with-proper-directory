const db = require(`../libraries/Db.js`);
const dt = require(`../libraries/Date.js`);

module.exports={
    create: function(data, cb){
        data.created_at = dt.now();
        data.updated_at = dt.now();
        delete data._csrf;
        db.query('INSERT INTO articles SET ?', data, cb);
    }
}