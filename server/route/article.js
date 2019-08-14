var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');
var tokenCheck = require('./../api/token');

router.post('/api/article', function (req, res) {
  let token =req.query.token
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
  }else {
    let content = req.body.content
    let title = req.body.title
    let descImg = req.body.descImg
    let desc = req.body.descImg
    mysql.connect('INSERT article set content=?,article_from=?,title=?,descImg=?,desc=?',[content,tokenVerify,title,descImg,desc],function (results) {
        let response
          response = {
            Code:200,
            Data:{
              Msg:'保存成功',
            }
          }
    
         res.send(response);
      });

  }
  

});

module.exports = router;