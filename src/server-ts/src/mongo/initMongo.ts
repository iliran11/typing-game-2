import { Enviroments } from '../../../types';
const mongoose = require('mongoose');

function initMongoProcedure(url) {
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  // update level: db.users.updateOne({id:"10155286331682924"},{$set: {level:1}})
  db.once('open', function() {
    // console.log('hello database');
  });
  mongoose.connect(url);
  mongoose.Promise = global.Promise;
}

function initMongoDev() {
  const dbPassword = process.env.SERVER_DB_DEV_PASSWORD;
  const dbUser = process.env.SERVER_DB_DEV_USER;
  let url = `mongodb://${dbUser}:${dbPassword}@ds131784.mlab.com:31784/typing-game`;
  initMongoProcedure(url);
}

function initMongoStaging() {
  const dbPassword = process.env.SERVER_DB_STAGING_PASSWORD;
  const dbUser = process.env.SERVER_DB_STAGING_USER;
  let url = `mongodb://${dbUser}:${dbPassword}@ds255924.mlab.com:55924/typing-game-staging`;
  initMongoProcedure(url);
}

/**
 * gamerecords/GameRecords - every second records the game status.
 * game-summary - every game has one record. when it stop, it updates with final result.
 * recordsperplayers/GameRecord  - every game - save the player final result.
 * typing - every letter the user has typed - has a record.
 * achievement-progress - snapshot of the achievements for each game - before and after.
 */

function initMongo() {
  switch (process.env.SERVER_ENVIROMENT) {
    case Enviroments.LOCAL:
      initMongoDev();
      break;
    case Enviroments.STAGING:
      initMongoStaging();
      break;
    default:
      initMongoDev();
  }
}

export default initMongo;

//mongo ds131784.mlab.com:31784/typing-game -u admin -p bEKqgqW38Ts5Naek
