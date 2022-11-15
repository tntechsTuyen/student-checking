const createError = require('http-errors');
const express = require('express');
let app = express();
var expressWs = require('express-ws');
var expressWs = expressWs(express());
var ws = expressWs.app;
var wss = expressWs.getWss('/');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./src/router/router.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { maxAge: Date.now() + (30 * 86400 * 1000) }}));
app.use(fileUpload({
  createParentPath: true
}));

app.use('/', router);

ws.ws('/', function(ws, req) {
  ws.onmessage = function(msg) {
    wss.clients.forEach(function (client) {
      client.send(msg.data);
    });
  };
});

ws.listen(83, () => {
  console.info('{ws} listen port', 83);
})

// catch 404 and forward to error handler
app.listen(82, () => {
  console.info('{http} listen port', 82);
})
