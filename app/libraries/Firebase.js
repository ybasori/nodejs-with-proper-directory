const serviceAccount = require(`${__dirname}/../../secrets/yusuf-9c0ce-firebase-adminsdk-xplsl-2a746630c9.json`);
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://yusuf-9c0ce.firebaseio.com",
    storageBucket: "yusuf-9c0ce.appspot.com"
});

module.exports = admin;