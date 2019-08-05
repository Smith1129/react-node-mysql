var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');

router.get('/api/register', function (req, res) {
    let username =req.query.registerUsername
    let pass = req.query.registerPass
    let name = req.query.name
    mysql.connect('SELECT * from user where username=?',[username],function (results) {
      let response
      console.log(results.length)
      if(results.length==0){
            mysql.connect('INSERT into user set username=? , pass =?,name=?',[username,pass,name],function (results) {
              const data = {
                Code:200,
                Data:{
                    Msg:''
                }
              }
              res.send(data);
        })
      }else{
        response = {
            Code:111,
            Data:{
              Msg:'用户名已存在'
            }
          }
          res.send(response);
    }
       
    });
  
  });
  
  module.exports = router;