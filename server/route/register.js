var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');

router.get('/api/register', function (req, res) {
    let username =req.query.registerUsername
    let pass = req.query.registerPass
    let name = req.query.name
    mysql.connect('SELECT * from user where username=?',[username],function (results) {
      let response
      const avatar = 'https://i.loli.net/2019/08/07/cIJNVyRPlBTjhEd.jpg'
      if(results.length==0){
            mysql.connect('INSERT into user set username=? , pass =?,name=?,avatar=?',[username,pass,name,avatar],function (results) {
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