import { EnviromentsEnum } from '../../../types';
const mongoose = require('mongoose');

function initMongoGeneric() {
  const dbPassword = process.env.SERVER_DB_PASSWORD;
  const dbUser = process.env.SERVER_DB_USER;
  const url = process.env.SERVER_DB_URL;
  let fullUrl = `mongodb://${dbUser}:${dbPassword}@${url}`;
  initMongoProcedure(fullUrl);
}
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

/**
 * gamerecords/GameRecords *** RoomLog - every second records the room status.
 * room-summary - every room has one record. when it stop, it updates with final result.
 * recordsperplayers/GameRecord *** UserGameHistory  - every game - save the player final result.
 * typing - every letter the user has typed - has a record.
 * achievement-progress - snapshot of the achievements for each game - before and after.
 */

function initMongo() {
  switch (process.env.SERVER_ENVIROMENT) {
    case EnviromentsEnum.LOCAL:
    case EnviromentsEnum.PUBLIC:
    case EnviromentsEnum.DEV:
      initMongoGeneric();
      break;
    case EnviromentsEnum.STAGING:
      initMongoGeneric();
      break;
    case EnviromentsEnum.PUBLIC:
      initMongoGeneric();
      break;
    case EnviromentsEnum.PRODUCTION:
      initMongoGeneric();
      break;
    default:
      throw new Error(
        `${
          process.env.SERVER_ENVIROMENT
        } is uknown enviroment! check your .enum `
      );
  }
}

export default initMongo;

//mongo ds131784.mlab.com:31784/typing-game -u admin -p bEKqgqW38Ts5Naek
//mongo ds121996.mlab.com:21996/typing-test-staging -u admin -p ttTL2HdEeDT2ddqh
