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

review(app)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
