const mysql = require('mysql2/promise');

let connection;
//连接数据库
let aa = async () =>{
  connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'diedan123',
    database: 'forum'
  });
}
aa();
module.exports = {
  getDB () {
    return connection;
  }
}