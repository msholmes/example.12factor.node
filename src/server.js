require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');

var app = express(); 

// instances of EventEmitter can emit and/or subscribe to events 

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

app.on('ready', function() { 
    app.listen(PORT, HOST);
    console.log(`listening at http://${HOST}:${PORT}`); 
}); 

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/example";

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { 
    app.emit('connected'); 
});

// TODO: try similar with ldap
