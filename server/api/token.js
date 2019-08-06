var jwt = require("jsonwebtoken");
exports.checkToken = function(token){
    let secretOrPrivateKey="zzz"
    let result = ''
     jwt.verify(token,secretOrPrivateKey,function(err, decoded){
      if(!err){
          result =  decoded.token
      }else{
       result = 'n'
      }
    })
    return result
}
exports.setToken = function(val){
      let secretOrPrivateKey="zzz"
      let content = {token:val}
      let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60*60*1  // 1小时过期
  });
    return token
}