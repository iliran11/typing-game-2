db.inventory2.update({ 'finalResults.item': 'journal' }, { $set: { 'finalResults.$.qty': 90 } });
db.inventory2.find({ 'finalResults.item': 'journal' });
