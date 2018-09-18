const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

module.exports = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: String
});
