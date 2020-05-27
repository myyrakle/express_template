const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//정적파일 제공
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test')));

//미들웨어 연결
app.use(require('./middleware/db'));
app.use(require('./middleware/auth'));

//라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((request, response, next)=>{
  next(createError(404));
});

// error handler
app.use((error, request, response, next)=>{
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.send('error');
});

module.exports = app;
