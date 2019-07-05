// MODULE
const bcrypt = require(`bcryptjs`);

// EXTRAS
const Config = require(`../../configs/config.js`);
const Validator = require(`../libraries/Validator.js`);

// MODEL
const User = require(`${Config.dir.model}/User.js`);
const Profile = require(`${Config.dir.model}/Profile.js`);



module.exports = {
    account       : async function(req, res){
        var data = {
            csrfToken: req.csrfToken(),
            layout:`${Config.dir.view}/layouts/setting`
        }

        let dataUser = null;

        await User.getById(req.session.userId).then(function(result){ dataUser = result[0] });

        data.dataUser = dataUser;

        return res.render(`${Config.dir.view}/pages/setting/account`,data);

    },
    accountUpdate : async function(req, res){
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
                    required: false
                }
            },
            password_confirmation: {
                label: "Password Confirmation",
                rule: {
                    required: false,
                    equalsTo: "password"
                }
            }
        }

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                msg: "Something went wrong!",
                errors: validator.getMessages()
            });
        }
        else{
            let update = {
                email : req.body.email.trim()
            }
            if(req.body.password != ""){
                update.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            }
            await User.update(update, req.session.userId).then(function(result){
                return res.status(200).json({
                    msg: "Successfully saved!"
                });

            }).catch(function(err){
                return res.status(400).json({
                    msg: "Something went wrong!",
                    data: err
                });
            });
        }
    },
    profile : async function(req, res){
        var data = {
            csrfToken: req.csrfToken(),
            layout:`${Config.dir.view}/layouts/setting`
        }
        let dataProfile = null;

        await Profile.getByUserId(req.session.userId).then(function(result){ dataProfile = result[0] });

        data.dataProfile = dataProfile;

        return res.render(`${Config.dir.view}/pages/setting/profile`,data);
    },
    profileUpdate : async function(req, res){
        var rules = {
            name: {
                label: "Name",
                rule :{
                    required : true
                }
            }
        }

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                msg: "Something went wrong!",
                errors: validator.getMessages()
            });
        }
        else{

        }
    }
}