const request = require('request');
var jwt = require('jsonwebtoken');
const secret = 'secret-key';
import ServerManager from './classes/ServerManager';

// var packageJs = require('../package.json');

var app = require('express')();
var server = require('http').Server(app);
const port = process.env.PORT || 4001;
server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/bye', function(req, res) {
  // res.send(`ddServer Version: ${packageJs.version}`);
});
app.post('/api/login', function(req, res) {
  // const facebookToken = req.headers['authorization'];
  const facebookToken =
    'EAAJSq3chbXYBAJcAbI7N2EbURA0CV9M9J1ymTPJjoOXqSKLEgYwuwdnefVcu0u9T3fPWUHoZA9NZAj0S51gVafFF91RKJnJfZC9dAFTW3LPZCnAkJxmoMg1fNITqbIKwDDiVy59V8p42UCtX5uBAsb04WOYCFDKZAgEy4pnZCtq95qOJrR3TtjPREwZBov1hbCSlRLNFDP78gZDZD';

  var path = `https://graph.facebook.com/me?access_token=${facebookToken}`;
  request(path, (error, response, body) => {
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', body);
    const userData = JSON.parse(body)
    const token = jwt.sign({ id: userData.id }, secret, (err, token) => {
      res.send(token);
    });
  });
});
const serverManager = ServerManager.getInstance(server);
console.log('server started.');
