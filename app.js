require("dotenv").config();
require("dotenv").load();
require("./config/database");
let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let debug = require('debug')('app:http');
let PORT = process.env.PORT || 5000;
let routes = require("./config/routes");
let app = express();
let server = require('http').Server(app);


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/', express.static(path.join(__dirname, "public")))
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// app.use((req, res, next) => {
//   let err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

function debugReq(req, res, next){
  debug("params:", req.params);
  debug("query:", req.query);
  debug("body:", req.body);
  next();
};

server.listen(PORT, '0.0.0.0', (err) => {
  if(err) {
    return err;
  } else {
    console.log("SRC_DIR IS: ", path.resolve(__dirname, 'public/src'));
    console.log("Server Listening On %s", PORT);
  }
});

module.exports = app;
