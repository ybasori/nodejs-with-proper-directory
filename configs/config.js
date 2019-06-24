const dir = `${__dirname}/..`;



module.exports = {
    baseUrl : "http://localhost",
    port     : 3000,
    dir: {
        public     : dir+"/public",
        storage    : dir+"/storage",
        app        : dir+"/app",
        model      : dir+"/app/models",
        view       : dir+"/app/views",
        controller : dir+"/app/controllers",
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