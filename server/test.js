var mysql = require('mysql');
var tokenCheck = require('./api/token');
const a = tokenCheck.checkToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6Inp6eiIsImlhdCI6MTU2NjAxODIwOSwiZXhwIjoxNTY2MDIxODA5fQ.AL9iS2ZQ4nvpR44z0d8vYFe-P_VgVxpV34tVVDl7TcM.eyJ0b2tlbiI6Inp6eiIsImlhdCI6MTU2NTk3NzY4MSwiZXhwIjoxNTY1OTgxMjgxfQ.Kji_SPoBxFgBXQQl1sGNgNCKl8Gz8U1iV5HnJvhYmZ4'
  )
  console.log(a)
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'blog'
  });
  connection.connect();
  connection.query('select * from articleup where from_username=?',[undefined],function (error, results) {
    console.log(results)
    if(error){
      console.log('[SELECT ERROR] - ',error.message);
      return;
    }
  });
  
  // connection.end();

