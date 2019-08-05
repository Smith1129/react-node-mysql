var jwt = require("jsonwebtoken");
exports.checkToken = function(token){
    let secretOrPrivateKey="zzz" 
     jwt.verify(token,secretOrPrivateKey,function(err, decoded){
      if(!err){
          return decoded.token
      }else{
        return 'n'
      }
    })
}
exports.setToken = function(val){
      let secretOrPrivateKey="zzz"
      let content = {token:val}
      let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60*60*1  // 1小时过期
  });
    return token
}