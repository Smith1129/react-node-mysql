var mysql = require('mysql');
exports.connect = function(sql,val,callback) {
  const options = val
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'blog'
  });
  connection.connect();
  connection.query(sql,options,function (error, results) {
    if(error){
      console.log('[SELECT ERROR] - ',error.message);
      return;
    }
    callback(results);
  });
  
  // connection.end();
}
