const multer           = require('multer');
const cookieParser     = require('cookie-parser');
const csrf             = require('csurf');
const bodyParser       = require('body-parser');
const expressSession       = require('express-session');

module.exports = [
    multer().none(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser(),
    csrf({ cookie: true }),
    expressSession({secret: 'max', saveUninitialized: false, resave: false})
];