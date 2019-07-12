const Config = require(`../../configs/config.js`);

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
    }
}