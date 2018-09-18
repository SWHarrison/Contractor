var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

const express = require('express')
const methodOverride = require('method-override')

const app = express()

const review = require('./controllers/reviews');

const bodyParser = require('body-parser');

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

module.exports = app

review(app)

app.listen(process.env.PORT || '3000', () => {
    console.log(`App listening on port 3000!`)
})
