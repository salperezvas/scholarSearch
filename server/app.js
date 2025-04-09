const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(cors());

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname, '../client')));


//Make the server
var port = 777;

//Page Listeners
var router = require("./router.js");
router(app);

//Service Listeners
var services = require("./services.js");
services(app);

//Start the server
var server = app.listen(port, function(err) {
    if(err) throw err;
    console.log('App is running on port: ' + port);
});