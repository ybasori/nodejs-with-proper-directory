// MODULES
const fs             = require('fs');
const express        = require('express');
const app            = express();
const http           = require('http').createServer(app);



// CONFIG
const Config         = require(`${__dirname}/configs/config.js`);



// SET VIEW ENGINE
app.set('view engine', 'ejs');



// STATIC DIRECTORY LISTED IN CONFIG
for( var i = 0; i < Config.staticDir.length; i++ ){
    var route = Config.staticDir[i].route;
    var directory = Config.staticDir[i].directory;
    if (!fs.existsSync(`${directory}`)) fs.mkdirSync(`${directory}`);
    app.use(route, express.static(directory));
}



// LISTED IN ROUTES
const routes_web     = require(`${__dirname}/app/routes/web.js`)(express);
const routes_api     = require(`${__dirname}/app/routes/api.js`)(express);
const middleware     = require(`${__dirname}/app/middlewares/web_middleware.js`);
const middleware_api = require(`${__dirname}/app/middlewares/api_middleware.js`);
app.use('/', middleware, routes_web);
app.use('/api', middleware_api, routes_api);



// RUN SERVER
const port           = Number(process.env.PORT || Config.port);
http.listen(port, function(){ console.log('listening on *:'+port); });



// DIRECTORY LISTED IN .gitignore
if (!fs.existsSync(`secrets`)) fs.mkdirSync(`secrets`);