
// EXTRAS
const Config = require(`../../configs/config.js`);

module.exports = {
    index: function(req, res){
        var data = {
            csrfToken: req.csrfToken(),
            layout:`${Config.dir.view}/layouts/basic`
        }
        return res.render(`${Config.dir.view}/pages/home/index`,data);
    }
}