var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');
// var tokenCheck = require('./../api/token');

router.get('/api/searchList', function (req, res) {
  mysql.connect('SELECT * FROM search',[],function (results) {
    let response
    if(results.length==0){
       response = {
        Code:200,
        Data:{
          List:[]
        }
      }
    }else{
      const arr = []
      results.map((item)=>{
          arr.push(item.title)
      })
      response = {
        Code:200,
        Data:{
         List:arr
        }
      }
  }
     res.send(response);
  });

});

module.exports = router;