var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var config = require("./config");
var app = express();
var server = require("http").createServer(app);
var utils = require('./utils');
var cors = require("cors");
var lib, api, db;
// app.use(cors);
server.listen(process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: utils.EXPIRE_TIME
  }
}));
app.use(passport.initialize());
app.use(passport.session());



connectDb().then(function () {
  lib = require('./lib')(db);
  api = require('./api')(lib);
  require('./config/passport')(lib);  
  app.use('/api', api);
});

async function connectDb() {
  try {
    db = await config.connectDb();
    console.log("Connect to database successfully! ")
  } catch (e) {
    console.log("Cannot connect to database");
  }
}
