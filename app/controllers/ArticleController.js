
// EXTRAS
const Config = require(`../../configs/config.js`);
const Helper = require(`../libraries/Helper.js`);
const Validator = require(`../libraries/Validator.js`);
const Article = require(`${Config.dir.model}/Article.js`);

module.exports = {
    index: async function (req, res) {


        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/layouts/basic`,
            linkTo: {
                createArticle: Helper.baseUrl('/articles/create'),
                listArticle: Helper.baseUrl('/articles')
            }
        }




        var limit = 5;
        var page = 1;
        var offset = Helper.offset(limit,page);

        await Article.getAllByUserId("id, title, created_at, updated_at", req.session.userId, limit, offset).then(function(result){ data.articles = result; });


        return res.render(`${Config.dir.view}/pages/article/index`, data);
        
    },
    getItems: async function(req, res){
        return res.status(200).json(await Article.datatable(req.query, { user_id: req.session.userId }));
    },
    create: async function (req, res) {



        var data = {
            csrfToken: req.csrfToken(),
            layout: `${Config.dir.view}/layouts/basic`,
            linkTo: {
                createArticle: Helper.baseUrl('/articles/create'),
                listArticle: Helper.baseUrl('/articles')
            }
        }



        return res.render(`${Config.dir.view}/pages/article/create-edit`, data);
    },
    store: async function(req, res){
        var rules = {
            title: {
                label: "Title",
                rule :{
                    required: true
                }
            },
            thumbnail: {
                label: "Thumbnail",
                rule: {
                    required: true
                }
            },
            meta_keyword: {
                label: "Meta Keyword",
                rule:{
                    required: true
                }
            },
            meta_description: {
                label: "Meta Description",
                rule: {
                    required: true
                }
            },
            content: {
                label: "Content",
                rule: {
                    required: true
                }
            }
        }

        var data = req.body;
        delete data._csrf;
        data.user_id = req.session.userId;

        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            let slug = Helper.stripWords(data.title);
            let dataArticle = null
            await Article.getBySlug("*", slug).then(function(result){ dataArticle = result[0]; });

            if(typeof dataArticle != "undefined"){

                let lastRow = null;
                await Article.getLastRow("*").then(function(result){ lastRow = result[0]; });

                let lastId = lastRow.id;

                slug = slug + "-" + lastId;

            }

            data.slug = slug;


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
            layout: `${Config.dir.view}/layouts/basic`,
            linkTo: {
                editArticle: Helper.baseUrl('/articles/'+id),
                listArticle: Helper.baseUrl('/articles')
            }
        }
        await Article.getById("*", id).then(function (result){ data.article = result[0]; });
        
        return res.render(`${Config.dir.view}/pages/article/create-edit`, data);
    },
    update: async function(req, res){
        var id = req.params.id;
        var rules = {
            title: {
                label: "Title",
                rule: {
                    required: true
                }
            },
            thumbnail: {
                label: "Thumbnail",
                rule: {
                    required: true
                }
            },
            meta_keyword: {
                label: "Meta Keyword",
                rule:{
                    required: true
                }
            },
            meta_description: {
                label: "Meta Description",
                rule: {
                    required: true
                }
            },
            content: {
                label: "Content",
                rule: {
                    required: true
                }
            }
        }

        var data = req.body;
        delete data._csrf;
        let validator = await Validator.make(req.body, rules);
        if(validator.fails()){
            return res.status(400).json({
                errors: validator.getMessages()
            });
        }
        else{
            let permission = false;
            await Article.checkUserId(id, req.session.userId).then(function(result){ permission = result.length>0 ; });



            if(permission){


                let slug = Helper.stripWords(data.title);
                let dataArticle = null
                await Article.getBySlug("*", slug).then(function(result){ dataArticle = result[0]; });

                if(typeof dataArticle != "undefined" && dataArticle.id != id){

                    let lastRow = null;
                    await Article.getLastRow("*").then(function(result){ lastRow = result[0]; });

                    let lastId = lastRow.id;

                    slug = slug + "-" + lastId;

                }

                data.slug = slug;



                await Article.updateById(data, id).then(function(result){
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
            else{
                return res.status(500).json({
                    msg: "Permission denied!"
                });
            }
        }
    },
    delete: async function(req, res){
        var id = req.params.id;

        let permission = false;
        await Article.checkUserId(id, req.session.userId).then(function(result){ permission = result.length>0 ; });

        if(permission){
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
        else{
            return res.status(500).json({
                msg: "Permission denied!"
            });
        }
    }
}