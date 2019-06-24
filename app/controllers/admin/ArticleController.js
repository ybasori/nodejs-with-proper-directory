
// EXTRAS
const Config = require(`../../../configs/config.js`);
const Helper = require(`../../libraries/Helper.js`);
const Validator = require(`../../libraries/Validator.js`);

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
            thumbnail: {
                label: "Thumbnail",
                required: true
            },
            metaKeyword: {
                label: "Meta Keyword",
                required: true
            },
            metaDescription: {
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
            return res.status(200).json(req.body);
        }


        
    }
}