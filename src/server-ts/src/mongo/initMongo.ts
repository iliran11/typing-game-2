function initMongo() {
  const mongoose = require('mongoose');
  const dbPassword = 'bEKqgqW38Ts5Naek';
  const dbUser = 'admin';
  // mongo ds131784.mlab.com:31784/typing-game -u admin -p bEKqgqW38Ts5Naek
  let dev_db_url = `mongodb://${dbUser}:${dbPassword}@ds131784.mlab.com:31784/typing-game`;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', function() {
    console.log('hello database');
  });
  mongoose.connect(dev_db_url);
  mongoose.Promise = global.Promise;
}

export default initMongo;
