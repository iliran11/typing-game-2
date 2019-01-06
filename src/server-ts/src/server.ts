import { AUTH_HEADER_NAME, AUTH_FACEBOOK_HEADER } from '../../constants';
const request = require('request');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
import initMongo from './mongo/initMongo';
import loginController from './ExpressControllers/loginController';
import verifyLoginController from './ExpressControllers/verifyLoginController';
import gamesHistoryController from './ExpressControllers/gamesHistoryController';
import GamesHistoryController from './ExpressControllers/gameReplayController';
import UserAchievement from './ExpressControllers/UserAchievementController';
import HighlightsController from './ExpressControllers/HighlightsController';
import testController from './ExpressControllers/testController'

import {
  FacebookUserType,
  HandShakeData,
  LoginVerificationStatus
} from '../../types';
import { createUserInstance, User } from './mongo/User/UserModel';
import ServerManager from './classes/ServerManager';
import { getBase64FacebookPic } from './utilities';

// var packageJs = require('../package.json');
const result = require('dotenv').config();
if (result.error) {
  console.log(result.error);
}
const SECRET = process.env.SERVER_AUTH_SECRET;
initMongo();
var app = require('express')();
var server = require('http').Server(app);
const port = 4001;
server.listen(port);
// WARNING: app.listen(80) will NOT work here!
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json

// TODO: move all routes to a central files both in client and server.
app.use(bodyParser.json());
app.post('/login', loginController);
app.get('/verify-login', verifyLoginController);
app.get('/games-history', gamesHistoryController);
app.get('/game-replay', GamesHistoryController);
app.get('/user-achievement', UserAchievement);
app.get('/games-highlights', HighlightsController);
app.get('/test', testController);

const serverManager = ServerManager.getInstance(server);
console.log('server started.');
