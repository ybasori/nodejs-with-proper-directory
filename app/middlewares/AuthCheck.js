

const Config = require(`../../configs/config.js`);
const User = require(`${Config.dir.model}/User.js`);

module.exports = async function(req, res, next){
    if(typeof req.session.userId != "undefined"){
        let loggedin = false;
        await User.getById("*",req.session.userId).then(function(res){  (res.length>0) ? loggedin = true : loggedin = false ; });

        if(loggedin){
            next();
        }
        else{
            req.session.logout(function(err){
                if(err){
                    return res.redirect("/home");
                }
                else{
                    if(req.method != "GET"){
                        return res.status(401).json({
                            msg: "Unauthorized!"
                        });
                    }
                    else{
                        return res.redirect("/login");
                    }
                }
            });
        }
    }
    else{
        if(req.method != "GET"){
            return res.status(401).json({
                msg: "Unauthorized!"
            });
        }
        else{
            return res.redirect("/login");
        }
    }
}