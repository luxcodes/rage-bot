var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/heartbeat', function(req, res){
  res.send('Running!!');
});

app.post('/rb', function(req, res){
  var randomQuote = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
  };

  var query = req.body.text

  var quotes = {
    "wol": "'We are the Warriors of light such as if you where to go rogue you would still be a a sch.'",
    "stoping": "'I like pulling and stoping and pulling and stoping and then getting that big burst of white light'"
  }
  var quote = ""

  if (query) {
    if (typeof(quotes[query]) == "undefined") {
      quote = "'I dont fuckin know dude. That quote doesn't exist for all I know.'"
    } else {
      quote = quotes[query]
    }
  } else {
    quote = randomQuote(quotes)
  }

  var body = {
    response_type: "in_channel",
    "attachments": [
      {
        "text": quote + "\n" + " --Rancorage Cathal"
      }
    ]
  }
  res.send(body)
})

app.post('/events', function(req, res){
  var test = req.body
  console.log(test);
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
