// MODULE

// EXTRAS
const Config = require(`../../configs/config.js`);

// MIDDLEWARE
const AuthCheck = require(`${Config.dir.middleware}/AuthCheck.js`);
const AuthCheckReverse = require(`${Config.dir.middleware}/AuthCheckReverse.js`);

// CONTROLLERS
const AdminArticle   = require(`${Config.dir.controller}/ArticleController.js`);
const AuthController = require(`${Config.dir.controller}/AuthController.js`);
const HomeController = require(`${Config.dir.controller}/HomeController.js`);
const SettingController = require(`${Config.dir.controller}/SettingController.js`);


module.exports = function(app){

        app.get("/", [AuthCheck], HomeController.index);


        // LOGIN

        app.all('/login', [AuthCheckReverse]);

        app.route('/login')
            .get(AuthController.login)
            .post(AuthController.authenticate);

        // SETTING ACCOUNT

        app.use('/settings', [AuthCheck], (function(){

            app.route('/account')
                .get(SettingController.account)
                .put(SettingController.accountUpdate);

            app.route('/profile')
                .get(SettingController.profile)
                .put(SettingController.profileUpdate);

            return app;
        })());


        // ARTICLES

        app.get('/articles', [AuthCheck], AdminArticle.index);

        app.use('/articles', [AuthCheck], (function(){

            app.route('/create')
                .get(AdminArticle.create)
                .post(AdminArticle.store);


            app.route('/:id')
                .get(AdminArticle.edit)
                .put(AdminArticle.update)
                .delete(AdminArticle.delete);


            return app;
        })());

        

        
        



    return app;
}