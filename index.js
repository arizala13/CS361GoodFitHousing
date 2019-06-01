require('dotenv').config() // Retrieves DB login information from untracked .env file for basic security.
const express    = require('express')
const mysql      = require('mysql')
const app        = express()
const bodyParser = require('body-parser')
const port       = process.argv[2] !== undefined ? process.argv[2] : 3000 // Defaults to port 3000 if none is specified.


// Parse JSON post bodies automatically
app.use(bodyParser.json())

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// Configure class MariaDB connection with environment variables.
var con = mysql.createConnection({
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs361_hughesc3',
  password: 'group8goodfit',
  database: 'cs361_hughesc3'
});

var queryString = 'SELECT * FROM users';
 
con.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].email);
    }
});

/*
con.connect(function(err){
	if(err) throw err;
	console.log("You are connected!");
});
*/
con.end();