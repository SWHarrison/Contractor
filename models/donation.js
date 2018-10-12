const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/charity_contractor', {useNewUrlParser: true});

module.exports = mongoose.model('Donation', {
    title: String,
    amount: String,
    date: String,
    content: String,
    clientId: { type: Schema.Types.ObjectId, ref: 'Client'}
});
