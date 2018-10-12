const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/charity_contractor', { useMongoClient: true });

module.exports = mongoose.model('Client', {
  title: String,
  description: String,
});
