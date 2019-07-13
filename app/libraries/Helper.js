const Config = require(`../../configs/config.js`);
const sharp = require(`sharp`);
const fs             = require('fs');




const imageResize = function(oldfile, width, height){
    if (!fs.existsSync(`${Config.dir.origin}/storage/cache`)) fs.mkdirSync(`${Config.dir.origin}/storage/cache`);
    let filename = oldfile.split('/');
    filename = filename[filename.length-1];
    let ext  = filename.split('.');
    filename = ext[0];
    ext = ext[ext.length-1];
    let newfile = `${Config.dir.storage}/cache/${filename}_${width}x${height}.${ext}`;
    return new Promise(function(resolve, reject) {
        sharp(Config.dir.origin + "/" + oldfile)
                .resize(width, height)
                .toFile(newfile, function(err, info) {
                    // output.jpg is a 300 pixels wide and 200 pixels high image
                    // containing a scaled and cropped version of input.jpg
                    if(err){
                        reject(err)
                    }
                    else{
                        var name = newfile.split("/");
                        name = name[name.length-1];
                        resolve("storage/cache/"+name);
                    }
                });
    });
}

module.exports = {
    baseUrl: function(uri=null){

        // ^\/+   beginning of the string, pipe, one or more times
        // |      or
        // \/+$   pipe, one or more times, end of the string

        uri = (uri==null) ? "" : uri.replace(/^\/+|\/+$/g, '');

        var port = ((Config.port==null || Config.port== 80)?"":":"+Config.port)

        var base_url = Config.baseUrl + port;
        
        return base_url+"/"+uri;
    },
    offset: function(limit, page){
        return (page - 1) * limit;
    },
    stripWords: function(string){
        return string.toLowerCase().trim().replace(/[^\w\s]/gi, '').split(" ").join("-");
    },
    imageCache: async function (filename, width, height){
        return await imageResize(filename, width, height);
    }
}