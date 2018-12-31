var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'deutschstudy2018',
  password : 'ehrdlf',
  database : 'project2019'
});
 
exports.dbconnection = function () {
  return connection;
}
// connection.connect();
 
// connection.end();