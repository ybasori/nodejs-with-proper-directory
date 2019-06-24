
// EXTRAS
const Config = require(`../../../configs/config.js`);
const Helper = require(`../../libraries/Helper.js`);
const Validator = require(`../../libraries/Validator.js`);
const Article = require(`${Config.dir.model}/Article.js`);

module.exports = {
    index: function (req, res) {



        var data = {
            csrfToken: req.csrfToken()
        }



        return res.render(`${Config.dir.view}/pages/home/index`, data);
    },
    create: function (req, res) {



        var data = {
            csrfToken: req.csrfToken(),
            linkTo: {
                createArticle: Helper.baseUrl('/create')
            }
        }



        return res.render(`${Config.dir.view}/admin/pages/article/create`, data);
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
            Article.create(req.body, function(err, result, fields){
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