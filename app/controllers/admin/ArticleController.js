
// EXTRAS
const Config = require(`../../../configs/config.js`);
const Helper = require(`../../libraries/Helper.js`);
const Validator = require(`../../libraries/Validator.js`);
const Article = require(`${Config.dir.model}/Article.js`);

module.exports = {
    index: function (req, res) {


        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/admin/layouts/basic`,
            linkTo: {
                createArticle: Helper.baseUrl('/admin/articles/create'),
                listArticle: Helper.baseUrl('/admin/articles')
            }
        }

        var limit = 5;
        var page = 1;
        var offset = Helper.offset(limit,page);


        Article.getAll("id, title", limit, offset, function(err, result, fields){

            if(err) throw err;

            if(!err){

                data.articles = result;
                return res.render(`${Config.dir.view}/admin/pages/article/index`, data);

            }

        });
        
    },
    create: function (req, res) {



        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/admin/layouts/basic`,
            linkTo: {
                createArticle: Helper.baseUrl('/admin/articles/create'),
                listArticle: Helper.baseUrl('/admin/articles')
            }
        }



        return res.render(`${Config.dir.view}/admin/pages/article/create-edit`, data);
    },
    store: function(req, res){
        var rules = {
            title: {
                label: "Title",
                required: true
            },
            slug: {
                label: "Slug",
                required: true
            },
            thumbnail: {
                label: "Thumbnail",
                required: true
            },
            meta_keyword: {
                label: "Meta Keyword",
                required: true
            },
            meta_description: {
                label: "Meta Description",
                required: true
            },
            content: {
                label: "Content",
                required: true
            }
        }

        let validator = Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            Article.save(req.body, function(err, result, fields){
                if(err){
                    return res.status(500).json({
                        msg: "Internal server error",
                        data: err
                    });
                }
                else{
                    return res.status(200).json({
                        msg: "Successfully Saved!" 
                    });
                }
            });
        }


        
    },
    edit: function(req, res){
        var id = req.params.id;
        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/admin/layouts/basic`,
            linkTo: {
                editArticle: Helper.baseUrl('/admin/articles/'+id),
                listArticle: Helper.baseUrl('/admin/articles')
            }
        }
        Article.getById("*", id, function(err, result, fields){

            if(err) throw err;

            if(!err){

                data.article = result[0];
                return res.render(`${Config.dir.view}/admin/pages/article/create-edit`, data);

            }

        });
    },
    update: function(req, res){
        var id = req.params.id;
        var rules = {
            title: {
                label: "Title",
                required: true
            },
            slug: {
                label: "Slug",
                required: true
            },
            thumbnail: {
                label: "Thumbnail",
                required: true
            },
            meta_keyword: {
                label: "Meta Keyword",
                required: true
            },
            meta_description: {
                label: "Meta Description",
                required: true
            },
            content: {
                label: "Content",
                required: true
            }
        }

        let validator = Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            Article.update(req.body, id, function(err, result, fields){
                if(err){
                    return res.status(500).json({
                        msg: "Internal server error",
                        data: err
                    });
                }
                else{
                    return res.status(200).json({
                        msg: "Successfully Saved!" 
                    });
                }
            });
        }
    }
}