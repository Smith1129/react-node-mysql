var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');
var tokenCheck = require('./../api/token');

router.get('/api/user', function (req, res) {
  if(req.query.check){
    let token =req.query.token
    const tokenVerify = tokenCheck.checkToken(token)
    let response
    if(tokenVerify === 'n' || tokenVerify==''){
         response = {
          Code:200,
          Data:''
        }
        res.send(response)
      }else{
        const sqlSel = 'select * from user where username=?'
        mysql.connect(sqlSel,[tokenVerify],function (results){
          response = {
              Code:200,
              Data:{
                username:results[0].username,
                name:results[0].name,
                avatar:results[0].avatar,
              }
            }
            res.send(response)
        })
      }
  }else{  
    let username =req.query.username
    let pass = req.query.pass
    mysql.connect('SELECT * FROM user where username=? AND pass=?',[username,pass],function (results) {
      let response
      if(results.length==0){
        response = {
          Code:111,
          Data:{
            Msg:'用户名或者密码错误'
          }
        }
      }else{
        const data = tokenCheck.setToken(username)
        response = {
          Code:200,
          Data:{
            token:data,
            username:results[0].username,
            name:results[0].name,
            avatar:results[0].avatar,
          }
        }
    }
      res.send(response);
    });
  }

});

module.exports = router;
