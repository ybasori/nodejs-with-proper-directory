// EXTRAS
const Config = require(`../../configs/config.js`);



// CONTROLLER
const Upload = require(`${Config.dir.controller}/api/UploadController.js`);



module.exports = function(express){
    const app = express.Router();

    app.post("/v1/upload", Upload.upload);

    return app;
}