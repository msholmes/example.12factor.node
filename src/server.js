var express = require('express');
var mongoose = require('mongoose');
var ldap = require('ldapjs');

var app = express(); 

// instances of EventEmitter can emit and/or subscribe to events 

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.on('ready', function() { 
    app.listen(PORT, HOST);
    console.log(`listening at http://${HOST}:${PORT}`); 
}); 

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function() { 
    app.emit('ready'); 
});

const LDAP_URL = process.env.LDAP_URL;
const LDAP_USER = process.env.LDAP_USER;
const LDAP_PASSWORD = process.env.LDAP_PASSWORD;

var client = ldap.createClient({ url: LDAP_URL });
client.on('error', console.error.bind(console, 'ldap connection error:'));
client.once('connect', function() {
    console.log("LDAP UP");
    //app.emit('up');
});
