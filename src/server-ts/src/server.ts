import ServerManager from './models/ServerManager';
// import gamesHistoryController from './ExpressControllers/gamesHistoryController';
import {
  loginController,
  GamesHistoryController,
  HighlightsController,
  UserAchievementController,
  VerifyLoginController,
  VersionController
} from './ExpressControllers/controllersIndex';
import initMongo from './mongo/initMongo';
var bodyParser = require('body-parser');

const cors = require('cors');
// var packageJs = require('../package.json');
const result = require('dotenv').config();
if (result.error) {
  console.log(result.error);
}
initMongo();
var app = require('express')();
app.use(cors());
var server = require('http').Server(app);
const port = 4001;
server.listen(process.env.PORT || port);
// WARNING: app.listen(80) will NOT work here!
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json

app.use(bodyParser.json());
app.post('/login', loginController);
app.get('/verify-login', VerifyLoginController);
// app.get('/games-history', gamesHistoryController);
app.get('/game-replay', GamesHistoryController);
app.get('/user-achievement', UserAchievementController);
app.get('/games-highlights', HighlightsController);
app.get('/version', VersionController);

const serverManager = ServerManager.getInstance(server);
