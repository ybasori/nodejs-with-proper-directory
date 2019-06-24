// MODULES

// EXTRAS
const mUpload = require(`../../libraries/Multer.js`);
const Helper = require(`../../libraries/Helper.js`);


module.exports = {
    upload: function(req,res){
        mUpload().any()(req, res, function(err){
            return res.status(200).json({
                greetings: Helper.baseUrl("bro")
            });
        });
    }
}