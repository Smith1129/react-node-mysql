var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');
var tokenCheck = require('./../api/token');

router.get('/api/upOrVote', function (req, res) {
    let token =req.query.token
    const tokenVerify = tokenCheck.checkToken(token)
    if(req.query.isAll){
        let response
        const upListSql = 'select article_id from articleup where from_username=?'
        mysql.connect(upListSql,[tokenVerify],function (results) {
            if(results.length === 0){
                response = {
                    Code:200,
                    Data:[]
                }
                res.send(response)
            }else{
                const newData = results.map((item)=>{
                    return item.article_id
                })
                response={
                    Code:200,
                    Data:newData
                }
                res.send(response)
            }
        })

    }else{
        if(tokenVerify === 'n' || tokenVerify==''){
            const result = {
                Code:333,
                Data:{
                Msg:'token无效或已过期......'
                }
            }
            res.send(result);
            return
        }else{
            const sqlSearch = 'SELECT id FROM articleup where from_username=?'
            const sqlInsert = 'Insert into articleup(from_username,article_id) values (?,?)'
            const sqlDel = 'DELETE from articleup where from_username=? AND article_id=?'
            const sqladd = 'Update article set vote=vote+1 where id=?'
            const numberdel = 'Update article set vote=vote-1 where id=?'
            let type = req.query.type
            let articleId = req.query.id
            if(type === 'up'){
                mysql.connect(sqlSearch,[tokenVerify],function (results) {
                let response
                if(results.length==0){
                    mysql.connect(sqlInsert,[tokenVerify,articleId],function (results) {
                        mysql.connect(sqladd,[articleId],function (results) {
                            response = {
                                Code:200,
                                Data:{
                                    Msg:'操作成功'
                                }
                            }
                            res.send(response);
                        })
                        
                    })
                }else{
                    mysql.connect(sqlDel,[tokenVerify,articleId],function (results) {
                        mysql.connect(numberdel,[articleId],function (results) {
                            response = {
                                Code:200,
                                Data:{
                                    Msg:'取消成功'
                                }
                            }
                            res.send(response);
                        })
                    })
                }
                
            });
            }
        }
    }

});

module.exports = router;