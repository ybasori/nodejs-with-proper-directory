const Config = require(`../../configs/config.js`);

module.exports = {
    base_url: function(uri=null){

        // ^\/+   beginning of the string, pipe, one or more times
        // |      or
        // \/+$   pipe, one or more times, end of the string

        uri = (uri==null) ? "" : uri.replace(/^\/+|\/+$/g, '');

        var port = ((Config.port==null || Config.port== 80)?"":":"+Config.port)

        var base_url = Config.base_url + port;
        
        return base_url+"/"+uri;
    }
}