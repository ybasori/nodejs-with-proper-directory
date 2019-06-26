
// EXTRAS
const Config = require(`../../../configs/config.js`);
const Helper = require(`../../libraries/Helper.js`);
const Validator = require(`../../libraries/Validator.js`);
const Article = require(`${Config.dir.model}/Article.js`);

module.exports = {
    index: async function (req, res) {


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

        await Article.getAll("id, title", limit, offset).then(function(result){ data.articles = result; });


        return res.render(`${Config.dir.view}/admin/pages/article/index`, data);
        
    },
    create: async function (req, res) {



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
    store: async function(req, res){
        var rules = {
            title: {
                label: "Title",
                required: true
            },
            slug: {
                label: "Slug",
                required: true,
                unique: "articles,slug"
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

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            await Article.save(req.body).then(function(result){
                return res.status(200).json({
                    msg: "Successfully Saved!" 
                });
            }).catch(function(err){
                return res.status(500).json({
                    msg: "Internal server error",
                    data: err
                });
            });
        }


        
    },
    edit: async function(req, res){
        var id = req.params.id;
        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/admin/layouts/basic`,
            linkTo: {
                editArticle: Helper.baseUrl('/admin/articles/'+id),
                listArticle: Helper.baseUrl('/admin/articles')
            }
        }
        await Article.getById("*", id).then(function (result){ data.article = result[0]; });
        
        return res.render(`${Config.dir.view}/admin/pages/article/create-edit`, data);
    },
    update: async function(req, res){
        var id = req.params.id;
        var rules = {
            title: {
                label: "Title",
                required: true
            },
            slug: {
                label: "Slug",
                required: true,
                unique: "articles,slug,"+req.params.id+",id"
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

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            await Article.updateById(req.body, id).then(function(result){
                return res.status(200).json({
                    msg: "Successfully Saved!" 
                });
            }).catch(function(err){
                return res.status(500).json({
                    msg: "Internal server error",
                    data: err
                });
            });
        }
    },
    delete: async function(req, res){
        var id = req.params.id;

        await Article.deleteById(id).then(function(result){
            
                return res.status(200).json({
                    msg: "Successfully Deleted!"
                });
                
        }).catch(function(err){
            return res.status(500).json({
                msg: "Internal server error",
                data: err
            });
        });
    }
}