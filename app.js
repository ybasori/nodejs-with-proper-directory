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



// STATIC ASSETS
app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery`));
app.use("/popper.js", express.static(`${__dirname}/node_modules/popper.js`));
app.use("/sweetalert2", express.static(`${__dirname}/node_modules/sweetalert2`));



// LISTED IN ROUTES
const routes_web     = require(`${__dirname}/app/routes/web.js`)(express.Router());
const routes_api     = require(`${__dirname}/app/routes/api.js`)(express.Router());
const middleware     = require(`${__dirname}/app/middlewares/middleware.js`);
app.use('/api', middleware.web, routes_api);
app.use('/', middleware.web, routes_web);



// RUN SERVER
const db           = require(`${__dirname}/app/libraries/Db.js`);
const port           = Number(process.env.PORT || Config.port);
db.connect(function(){
    http.listen(port, function(){ console.log('listening on *:'+port); });
});



// DIRECTORY LISTED IN .gitignore
if (!fs.existsSync(`secrets`)) fs.mkdirSync(`secrets`);