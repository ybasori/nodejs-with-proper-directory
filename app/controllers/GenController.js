// MODULE
const http = require('http');
const https = require('https');
const fs = require('fs');
const Helper = require(`../libraries/Helper.js`);


// EXTRAS
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
        let url = req.body.url.split("/");
        let _file = url[url.length-1];
        let ext = (_file).match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
        if(ext != null && ext.length !=0 && typeof ext[1] !="undefined" && (ext[1] == "jpeg" || ext[1] == "jpg" || ext[1] == "gif" || ext[1] == "png")){
            let filename = (new Date).getTime() + "." + ext[1];
            let file = fs.createWriteStream(Config.dir.storage + "/" + filename);

            let storage_url = null;
            await getFile(req.body.url, file, filename).then(async result=>{ 
                storage_url = result;
                await UserImage.save({
                    name: storage_url,
                    user_id: req.session.userId
                }).then(result=>{});
        
                return res.status(200).json({
                    msg: "Success!",
                    data: storage_url
                });
            }).catch(err=>{
                return res.status(400).json({
                    msg: "Something went wrong!",
                    errors: err
                });
            });
        }
        else{
            return res.status(400).json({
                msg: "Something went wrong!"
            });
        }

        

    },
    getMyImage: async function(req, res){
        let offset = (req.params.page - 1) * req.params.limit;
        let limit = req.params.limit;
        let data = null;
        let total = 0;
        await UserImage.getAllbyUserId("*",req.session.userId, limit, offset).then(response => { data = response });
        await UserImage.getAllTotalbyUserId(req.session.userId).then(response => { total = response[0].total });

        for(var i = 0; i<data.length; i++){
            await Helper.imageCache(data[i].name, 100, 100).then(response=>{
                data[i].nameCache = response
            });
        }

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