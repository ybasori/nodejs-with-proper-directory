

const Config = require(`../../configs/config.js`);
const User = require(`${Config.dir.model}/User.js`);

module.exports = async function(req, res, next){
    if(typeof req.session.userId != "undefined"){
        let loggedin = false;
        await User.getById("*",req.session.userId).then(function(res){  (res.length>0) ? loggedin = true : loggedin = false ; });

        if(loggedin){
            return res.redirect("/home");
        }
        else{
            req.session.logout(function(err){
                if(err){
                    return res.redirect("/home");
                }
                else{
                    next();
                }
            });
        }
    }
    else{
        next();
    }
}