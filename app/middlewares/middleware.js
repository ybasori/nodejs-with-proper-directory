const Session          = require('./Session.js');
const multer           = require('multer');
const cookieParser     = require('cookie-parser');
const csrf             = require('csurf');
const bodyParser       = require('body-parser');
const expressSession   = require('express-session');
const cors             = require('cors');

module.exports = {
    web: [
        multer().none(),
    
        bodyParser.urlencoded({ extended: false }),
    
        cookieParser(),
    
        csrf({ cookie: true }),
    
        expressSession(Session)
    ],
    api:[
        cors()
    ]
}