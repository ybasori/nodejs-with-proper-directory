// MODULES
const fs = require('fs');

// EXTRAS
const Config = require(`../../configs/config.js`);
const mUpload = require(`../libraries/Multer.js`);


module.exports = {
    index: function (req, res) {

        return res.render(`${Config.dir.view}/pages/home/index`, {
            greetings: "hello"
        });

    },

    upload: function(req,res){
        mUpload().any()(req, res, function(err){
            return res.status(200).json(req.body);
        });
    },

    list: function(req, res){

        var testFolder = Config.dir.storage;
        fs.readdir(testFolder, (err, files) => {
            return res.status(200).json(files);
        });

    }
}