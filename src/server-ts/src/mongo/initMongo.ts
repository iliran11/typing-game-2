function initMongo() {
  const mongoose = require('mongoose');
  const dbPassword = process.env.SERVER_DB_PASSWORD;
  const dbUser = process.env.SERVER_DB_USER;
  // update level: db.users.updateOne({id:"10155286331682924"},{$set: {level:1}})
  let dev_db_url = `mongodb://${dbUser}:${dbPassword}@ds131784.mlab.com:31784/typing-game`;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    // console.log('hello database');
  });
  mongoose.connect(dev_db_url);
  mongoose.Promise = global.Promise;
}

export default initMongo;


/** 
 * gamerecords/GameRecords - every second records the game status.
 * games/Game - every game has one record. when it stop, it updates with final result.
 * recordsperplayers/GameRecord  - every game - save the player final result.
 * typing - every letter the user has typed - has a record.
 */