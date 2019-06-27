
// EXTRAS
const Config = require(`../../configs/config.js`);
const Helper = require(`../libraries/Helper.js`);
const Validator = require(`../libraries/Validator.js`);
const User = require(`${Config.dir.model}/User.js`);
const bcrypt = require(`bcryptjs`);



module.exports = {
    login: function(req, res){
        var data = {
            csrfToken: req.csrfToken(),
            layout:`${Config.dir.view}/layouts/auth`
        }
        return res.render(`${Config.dir.view}/pages/auth/login`,data);
    },
    authenticate: async function(req, res){
        var rules = {
            email: {
                label: "E-mail",
                rule :{
                    required : true,
                    email    : true
                }
            },
            password: {
                label: "Password",
                rule: {
                    required: true
                }
            }
        }

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            let user = null;
            await User.getByEmail(req.body.email.trim()).then(function(result){ user = ((typeof result[0]=="undefined") ? null : result[0]); });

            if(!user){
                return res.status(400).json({
                    msg: "Wrong E-mail or Password!" 
                });
            }
            else{
                await bcrypt.compare(req.body.password, user.password).then(function(result){ 
                    if(result){
                        req.session.userId = user.id;
                        return res.status(200).json({
                            msg: "Welcome!" 
                        });
                    }
                    else{
                        return res.status(400).json({
                            msg: "Wrong E-mail or Password!" 
                        });
                    }
                });
            }
            
        }
    }
}