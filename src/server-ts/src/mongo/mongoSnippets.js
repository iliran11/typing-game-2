// @ts-ignore-start

// mongo ds131784.mlab.com:31784/typing-game -u admin -p bEKqgqW38Ts5Naek

db.recordsperplayers.aggregate([
  {
    $group: {
      _id: '$id',
      maxWpm: { $max: '$score' }
    }
  },
  {
    $sort: {
      maxWpm: -1
    }
  }
]);

db.recordsperplayers.find({}, { score: 1 }).pretty();

db.users.find().pretty();

// @ts-ignore-end
