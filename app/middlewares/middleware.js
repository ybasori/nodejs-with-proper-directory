const Session          = require('./Session.js');
const multer           = require('multer');
const cookieParser     = require('cookie-parser');
const csrf             = require('csurf');
const bodyParser       = require('body-parser');
const expressSession   = require('express-session');
const cors             = require('cors');
const Config           = require(`../../configs/config.js`);
const path             = require('path');


// Check File Type
const checkFileType = function (file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

const uploadingURL = [

];

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