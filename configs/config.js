const dir = `${__dirname}/..`;



module.exports = {
    env       : "development",
    baseUrl   : "http://localhost",
    port      : 3000,
    session   : {
        name     : 'sid',
        lifetime : 2 * 60 * 60 * 1000,
        secret   : "{:>L<>?!@#$%^&*()",
    },
    dir       : {
        public     : dir+"/public",
        storage    : dir+"/storage",
        app        : dir+"/app",
        model      : dir+"/app/models",
        view       : dir+"/resources/views",
        controller : dir+"/app/controllers",
        middleware : dir+"/app/middlewares"
    },
    staticDir :[
        {
            route     : "/",
            directory : dir+"/public" 
        },
        {
            route     : "/storage",
            directory : dir+"/storage"
        }
    ]
}