const dir = `${__dirname}/..`;



module.exports = {
    baseUrl : "http://localhost",
    port     : 3000,
    dir: {
        public     : dir+"/public",
        storage    : dir+"/storage",
        app        : dir+"/app",
        controller : dir+"/app/controllers",
        view       : dir+"/app/views",
    },
    staticDir :[
        {
            route     : "/",
            directory : "public" 
        },
        {
            route     : "/storage",
            directory : "storage"
        }
    ]
}