module.exports = {
    notFound: function(req, res){
        if (req.accepts('html')) {
            return res.status(404).send('page not found');
        }
    
        // respond with json
        if (req.accepts('json')) {
            return res.status(404).json({
                msg: "not found"
            });
        }
    }
}