var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');
var tokenCheck = require('./../api/token');

router.get('/api/infoReset', function (req, res) {
  let token =req.query.token
  let type = req.query.type
  const tokenVerify = tokenCheck.checkToken(token)
  if(tokenVerify === 'n' || tokenVerify==''){
      const result = {
          Code:333,
          Data:{
            Msg:'token无效或已过期......'
          }
      }
      res.send(result);
      return
  }else if(type=='upload') {
    let imgUrl = req.query.imgUrl
    mysql.connect('UPDATE user set avatar=? where username=?',[imgUrl,tokenVerify],function (results) {
        let response
        if(!results){
           response = {
            Code:111,
            Data:{
              Msg:'上传失败'
            }
          }
        }else{
          response = {
            Code:200,
            Data:{
              Msg:'上传成功',
              imgUrl:imgUrl
            }
          }
      }
         res.send(response);
      });

  }else if(type == 'name')
  {
    let name = req.query.name
    mysql.connect('UPDATE user set name=? where username=?',[name,tokenVerify],function (results) {
      let response
      response = {
        Code:200,
        Data:{
          Msg:'修改成功'
        }
      }
       res.send(response);
    });
  }
  

});

module.exports = router;