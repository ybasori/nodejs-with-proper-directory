// MODULE

// EXTRAS
const Config = require(`../../configs/config.js`);

// CONTROLLERS
const Home = require(`${Config.dir.controller}/HomeController.js`);


module.exports = function(express){
    const app = express.Router();
    
    app.get('/', Home.index);
    app.post('/upload', Home.upload);
    app.get('/list', Home.list);

    return app;
}