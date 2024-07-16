// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  let input = req.params.date;

  let isValidDate = Date.parse(input);
  let isValidUnix = /^[0-9]+$/.test(input);
  let isEmpty = input == "" || input == null;
  
  let unix = 0;
  let utc = "";

  if(isValidDate) {
    unix = new Date(input);
    utc = unix.toUTCString();
    return res.json({
      unix: unix.valueOf(),
      utc: utc
    });
  } else if (isNaN(isValidDate) && isValidUnix) {
    unix = new Date(parseInt(input));
    utc = unix.toUTCString();
    return res.json({
      unix: unix.valueOf(),
      utc: utc
    });
  } else if (isEmpty) {
    unix = new Date();
    utc = unix.toUTCString();
    return res.json({
      unix: unix.valueOf(),
      utc: utc
    });
  } else {
    res.json({error: "Invalid Date"});
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
