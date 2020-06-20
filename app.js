const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

/*import routes*/
const orderRoute = require('./routes/order');

/*set up*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*activate routes*/
app.use('/order', orderRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*mongodb config*/
mongoose.connect('mongodb://127.0.0.1:27017/burger-builder', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.log('An error occurs when connecting to Mongodb :' + err);
    });

/* Connect to database */
const DB = mongoose.connection;
DB.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
DB.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*listen on port*/
const port = process.env.PORT || PORT;
app.listen(port, () => console.log('server started on port ' + PORT));

module.exports = app;
