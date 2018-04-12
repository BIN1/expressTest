var express=require('express');
var path=require('path');
var favicon=require('serve-favicon');
var logger=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var appdebug=require('debug')('exdebug:app');
appdebug(process.env.NODE_ENV);
console.log(process.env.NODE_ENV);


var routers=require('./routes/index');

var app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));


app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api/subject", routers);

app.use(function(req,res,next){
    var err=new Error('Not Found');
    err.status=404;
    next(err);
});

app.use(function(err,req,res,next){
    res.locals.message=err.message;
    res.locals.error=req.app.get('env') === 'development' ? err :{};
    res.status(err.status||500);
    res.render('error');
});

module.exports=app;