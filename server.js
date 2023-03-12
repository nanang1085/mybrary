const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
// set
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
// layout
app.use(expressLayouts);
app.use(express.static('public'));
// body parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
// router
app.use('/', indexRouter);
app.use('/authors', authorRouter);

// mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));
// run
app.listen(process.env.PORT || 3000);