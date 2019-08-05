var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//route

var userInfo = require('./route/user');
var register = require('./route/register');
var searchList = require('./route/searchList');
var homeList = require('./route/homeList');

app.use('/', userInfo);
app.use('/',register)
app.use('/',searchList)
app.use('/',homeList)

app.all('*',function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

//设置静态文件目录
app.use(express.static('static'));

var server = app.listen(4000,function(){
});
