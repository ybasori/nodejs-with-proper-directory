// MODULE

// EXTRAS
const Config = require(`../../configs/config.js`);

// CONTROLLERS
const AdminArticle = require(`${Config.dir.controller}/ArticleController.js`);


module.exports = function(app){
    




        app.use('/articles', (function(){


            app.get('/', AdminArticle.index);

            app.route('/create')
                .get(AdminArticle.create)
                .post(AdminArticle.store);


            app.route('/:id(\\d{0,})')
                .get(AdminArticle.edit)
                .put(AdminArticle.update)
                .delete(AdminArticle.delete);

            



            return app
        })());


    return app;
}