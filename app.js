const fs             = require('fs');
const express        = require('express');
const app            = express();
const http           = require('http').createServer(app);
const io             = require('socket.io')(http);



const Config         = require(`${__dirname}/configs/config.js`);
const routes_web     = require(`${__dirname}/app/routes/web.js`)(express);
const routes_api     = require(`${__dirname}/app/routes/api.js`)(express);
const middleware     = require(`${__dirname}/app/middlewares/web_middleware.js`);
const middleware_api = require(`${__dirname}/app/middlewares/api_middleware.js`);


if (!fs.existsSync(`${Config.dir.storage}`)) fs.mkdirSync(`${Config.dir.storage}`);
if (!fs.existsSync(`${Config.dir.public}`)) fs.mkdirSync(`${Config.dir.public}`);



app.set('view engine', 'ejs');



app.use('/', express.static('public'));
app.use('/storage', express.static('storage'));



app.use('/', middleware, routes_web);
app.use('/api', middleware_api, routes_api);




const port           = Number(process.env.PORT || Config.port);
http.listen(port, function(){ console.log('listening on *:3000'); });



const devices    = [
    "-LhcedV_9_NOlNs9flKM"
];

const firebase   = require(`${__dirname}/app/libraries/Firebase.js`);
const fb_db      = firebase.database();
io.on('connection', function(socket){
    for(var i = 0; i<devices.length; i++){

        var device_id = devices[i];
        var ref = fb_db.ref("home/devices/"+device_id+"/current_cam");
        // Attach an asynchronous callback to read the data at our posts reference
        ref.on("value", function(snapshot) {
            io.emit(device_id, snapshot.val());
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });



        var glob = require("glob");
        // var files = glob.readdirSync('public/storage/-LhcedV_9_NOlNs9flKM___2019062307*', {});

        // io.emit(device_id+"-recorded", files);

        glob(`public/storage/${device_id}___2019062309*`, function (er, files) {
            io.emit(device_id+"-recorded", files);
        })
    }
    
});




