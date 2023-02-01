// index.js
// where your node app starts

// init project
require('dotenv').config()
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use('/', (req, res, next) => {
  console.log(req.method + " "+req.path)
  next();
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});



// your first API endpoint...
app.get("/api/:date", function (req, res) {
  req.time = new Date()
  req.params.date.length == 10 ? req.time = new Date(req.params.date) : req.time.setTime(req.params.date)
  if (req.time.toString() == 'Invalid Date') res.json({error: 'Invalid Date'})
  res.json({
    unix: req.time.getTime(),
    utc: req.time.toUTCString(),
  });
});

app.get("/api/", function (req, res) {
  req.time = new Date()
  res.json({
    unix: req.time.getTime(),
    utc: req.time.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
