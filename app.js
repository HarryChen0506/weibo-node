
//做一点修改，创建分支


var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var util = require('util');

var settings = require('./settings');

var index = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// flash 中间件，用来显示通知
app.use(flash());
app.use(session({
  //name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  //secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  //cookie: {
  //  maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  //},
  //store: new MongoStore({// 将 session 存储到 mongodb
  //  url: config.mongodb// mongodb 地址
  //}),

  secret: settings.cookieSecret,
  store: new MongoStore({db:settings.db})
}))

// 动态视图助手:添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  //res.locals.success = '成功';
  res.locals.error = req.flash('error').toString();
  next();
});


app.use('/', index);
app.use('/u', users);
app.use('/post', post);
app.use('/reg',reg);
app.use('/login',login);
app.use('/logout',logout);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(8100,function(){
  console.log("Server Start!");
});

module.exports = app;
