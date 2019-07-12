const Session          = require('./Session.js');
const multer           = require('multer');
const cookieParser     = require('cookie-parser');
const csrf             = require('csurf');
const bodyParser       = require('body-parser');
const expressSession   = require('express-session');
const cors             = require('cors');
const Config           = require(`../../configs/config.js`);
const path             = require('path');


module.exports = {
    web: [
        multer({
            storage: multer.diskStorage({
                destination: Config.dir.storage,
                filename: function(req, file, cb){
                    var filename = (new Date).getTime();
                    filename = (filename==null) ? (file.originalname) : (filename + path.extname(file.originalname))
                  cb(null,filename);
                }
            })
        }).any(),
    
        bodyParser.urlencoded({ extended: false }),
    
        cookieParser(),
    
        csrf({ cookie: true }),
    
        expressSession(Session)
    ],
    api:[
        cors()
    ]
}