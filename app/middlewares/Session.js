const Config           = require('../../configs/config.js');
module.exports={
    name              : Config.session.name,
    resave            : false,
    saveUninitialized : false,
    secret            : Config.session.secret,
    cookie            : {
        maxAge   : Config.session.lifetime,
        sameSite : true,
        secure   : Config.env === 'production'
    }
}