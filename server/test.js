var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'blog'
  });
  connection.connect();
  connection.query('DELETE from articleup where from_username=?',['zzz'],function (error, results) {
    console.log(results)
    if(error){
      console.log('[SELECT ERROR] - ',error.message);
      return;
    }
  });
  
  // connection.end();

