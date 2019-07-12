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
const GenController = require(`${Config.dir.controller}/GenController.js`);
const ErrorController = require(`${Config.dir.controller}/ErrorController.js`);


module.exports = function(app){

        app.get("/", [AuthCheck], HomeController.index);



        // LOGIN

        app.all('/login', [AuthCheckReverse]);
        app.route('/login')
            .get(AuthController.login)
            .post(AuthController.authenticate);




        // UPLOAD IMAGE
        app.post("/save-image", [AuthCheck], GenController.saveImage);
        app.get("/get-my-image/:limit/:page", [AuthCheck], GenController.getMyImage);
        app.post("/upload-image", [AuthCheck], GenController.uploadImage);




        // SETTING ACCOUNT
        app.all('/settings/account', [AuthCheck]);
        app.route('/settings/account')
            .get(SettingController.account)
            .put(SettingController.accountUpdate);

        app.all('/settings/profile', [AuthCheck]);
        app.route('/settings/profile')
            .get(SettingController.profile)
            .put(SettingController.profileUpdate);





        // ARTICLES

        app.get('/articles', [AuthCheck], AdminArticle.index);

        app.get('/articles/get-items', [AuthCheck], AdminArticle.getItems);

        app.all('/articles/create', [AuthCheck]);
        app.route('/articles/create')
            .get(AdminArticle.create)
            .post(AdminArticle.store);

        app.all('/articles/:id', [AuthCheck]);
        app.route('/articles/:id')
            .get(AdminArticle.edit)
            .put(AdminArticle.update)
            .delete(AdminArticle.delete);




        // ERRORS

        app.get('*', ErrorController.notFound);
        app.post('*', ErrorController.notFound);
        app.put('*', ErrorController.notFound);
        app.delete('*', ErrorController.notFound);

        
    return app;
}