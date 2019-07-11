// MODULE
const http = require('http');
const https = require('https');
const fs = require('fs');


// EXTRAS
const mUpload = require(`../libraries/Multer.js`);
const Config = require(`../../configs/config.js`);


// MODELS
const UserImage = require(`${Config.dir.model}/UserImage.js`);



const getFile = (url, file, filename) => {
    return new Promise(function(resolve, reject) {

        let pro = url.split(":");
        let protocol = pro[0];

        if(protocol=="https"){
            https.get(url, function(response) {
                response.pipe(file);

                resolve("storage/" + filename)
            });
        }
        else{
            http.get(req.body.url, function(response) {
                response.pipe(file);
                resolve("storage/" + filename)
            });
        }
        
    });
}


module.exports = {
    saveImage: async function(req, res){
        let url = req.body.url.split(".");
        let ext = url[url.length-1];
        let filename = (new Date).getTime() + "." + ext;
        let file = fs.createWriteStream(Config.dir.storage + "/" + filename);

        let storage_url = null;
        await getFile(req.body.url, file, filename).then(result=>{ storage_url = result; });

        await UserImage.save({
            name: storage_url,
            user_id: req.session.userId
        }).then(result=>{});

        return res.status(200).json({
            msg: "Success!",
            data: storage_url
        });

    },
    getMyImage: async function(req, res){
        let offset = (req.params.page - 1) * req.params.limit;
        let limit = req.params.limit;
        let data = null;
        let total = 0;
        await UserImage.getAllbyUserId("*",req.session.userId, limit, offset).then(response => { data = response });
        await UserImage.getAllTotalbyUserId(req.session.userId).then(response => { total = response[0].total });

        return res.status(200).json({
            msg: "Success!",
            data: {
                data: data,
                total: total
            }
        });
    },
    uploadImage: async function(req, res){
        await UserImage.save({
            name: "storage/"+req.files[0].filename,
            user_id: req.session.userId
        }).then(result=>{});
        return res.status(200).json({
            msg: "Success",
            data: "storage/"+req.files[0].filename
        });
    }
}