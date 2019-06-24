const dir = `${__dirname}/..`;



module.exports = {
    base_url : "http://localhost",
    port     : 3000,
    dir: {
        public     : dir+"/public",
        storage    : dir+"/storage",
        app        : dir+"/app",
        controller : dir+"/app/controllers",
        view       : dir+"/app/views",
    }
}