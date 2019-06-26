// MODULE

// EXTRAS
const Config = require(`../../configs/config.js`);

// CONTROLLERS
const Home = require(`${Config.dir.controller}/HomeController.js`);
const AdminArticle = require(`${Config.dir.controller}/admin/ArticleController.js`);


module.exports = function(app){
    

    app.use('/admin', (function(){



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



        return app
    })());

    app.get('/', Home.index);
    app.post('/', Home.post);
    app.post('/upload', Home.upload);
    app.get('/list', Home.list);

    return app;
}