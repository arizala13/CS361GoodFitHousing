var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_hughesc3',
  password        : 'group8goodfit',
  database        : 'cs361_hughesc3'
});

module.exports.pool = pool;