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
import versionController from './ExpressControllers/versionController';
import ChangeUserLevel from './ExpressControllers/ChangeUserLevelController';

import {
  FacebookUserType,
  HandShakeData,
  LoginVerificationStatus
} from '../../types';
import { createUserInstance, User } from './mongo/User/UserModel';
import ServerManager from './classes/ServerManager';
import { getBase64FacebookPic } from './utilities';
const cors = require('cors');
// var packageJs = require('../package.json');
const result = require('dotenv').config();
if (result.error) {
  console.log(result.error);
}
// const Sentry = require('@sentry/node');
// console.log('[enviroment] ', process.env.SERVER_ENVIROMENT)
// Sentry.init({
//   dsn: 'https://6ac55fff2f7e4348938a56e5637b5f07@sentry.io/1375055',
//   environment: process.env.SERVER_ENVIROMENT
// });

const SECRET = process.env.SERVER_AUTH_SECRET;
initMongo();
var app = require('express')();
app.use(cors());
var server = require('http').Server(app);
const port = 4001;
server.listen(process.env.PORT || 4001);
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
app.post('/change-level', ChangeUserLevel);
app.get('/version', versionController);

const serverManager = ServerManager.getInstance(server);
console.log('server started.');
