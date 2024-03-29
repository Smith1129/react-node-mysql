var express = require('express');
var router  = express.Router();
var mysql   = require('./../mysql/connect');

router.get('/api/homeList', function (req, res) {
    mysql.connect('SELECT * from article',[],function (results) {
      
      const arr = results.map((item)=>{
        return ({
          id:item.id,
          desc:item.desccontent,
          title:item.title,
          imgUrl:item.descImg,
          articleLike:item.like,
          articleUp:item.vote,
          articleComment:item.comment
        })
      })
      let response
      response = {
          Code:200,
          Data:{
            "topicList": [{
                "id": 1,
                "title": "社会热点",
                "imgUrl": "//upload.jianshu.io/collections/images/261938/man-hands-reading-boy-large.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
              }, {
                "id": 2,
                "title": "手手绘",
                "imgUrl": "//upload.jianshu.io/collections/images/21/20120316041115481.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64"
              }],
              "articleList":arr,
              // "articleList": [{
              //   "id": 1,
              //   "title": "胡歌12年后首谈车祸",
              //   "desc": "文/麦大人 01 胡歌又刷屏了。 近日他上了《朗读者》，而这一期的主题是“生命”，他用磁性的嗓音，朗读了一段《哈姆雷特》中的经典独白，相当震撼：...",
              //   "imgUrl": "//upload-images.jianshu.io/upload_images/2259045-2986b9be86b01f63?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"
              // }, {
              //   "id": 2,
              //   "title": "胡歌12年后首谈车祸：既然活下来了，就不能白白活着",
              //   "desc": "文/麦大人 01 胡歌又刷屏了。 近日他上了《朗读者》，而这一期的主题是“生命”，他用磁性的嗓音，朗读了一段《哈姆雷特》中的经典独白，相当震撼：...",
              //   "imgUrl": "//upload-images.jianshu.io/upload_images/2259045-2986b9be86b01f63?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"
              // }, {
              //   "id": 3,
              //   "title": "胡歌12年后首谈车祸：既然活下来了，就不能白白活着",
              //   "desc": "文/麦大人 01 胡歌又刷屏了。 近日他上了《朗读者》，而这一期的主题是“生命”，他用磁性的嗓音，朗读了一段《哈姆雷特》中的经典独白，相当震撼：...",
              //   "imgUrl": "//upload-images.jianshu.io/upload_images/2259045-2986b9be86b01f63?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"
              // }, {
              //   "id": 4,
              //   "title": "胡歌12年后首谈车祸：既然活下来了，就不能白白活着",
              //   "desc": "文/麦大人 01 胡歌又刷屏了。 近日他上了《朗读者》，而这一期的主题是“生命”，他用磁性的嗓音，朗读了一段《哈姆雷特》中的经典独白，相当震撼：...",
              //   "imgUrl": "//upload-images.jianshu.io/upload_images/2259045-2986b9be86b01f63?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240"
              // }],
              "recommendList": [{
                "id": 1,
                "imgUrl": "http://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"
              }, {
                "id": 2,
                "imgUrl": "http://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"
              },
                {
                  "id": 3,
                  "imgUrl": "http://cdn2.jianshu.io/assets/web/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"
                },
                {
                  "id": 4,
                  "imgUrl": "http://cdn2.jianshu.io/assets/web/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png"
                }
              ]
            
            }
          }
          
      res.send(response);
       
    });
  
  });
  
  module.exports = router;