import ServerManager from './classes/ServerManager';
var packageJs = require('../package.json');

var app = require('express')();
var server = require('http').Server(app);
const port = process.env.PORT || 4001;
server.listen(port);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function(req, res) {
  res.send(`Server Version: ${packageJs.version}`);
});
const serverManager = ServerManager.getInstance(server);
console.log('server started.');
