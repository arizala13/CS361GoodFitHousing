var express = require('express');

var engines = require('consolidate');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');


const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = process.argv[2];

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
     host : 'classmysql.engr.oregonstate.edu',
	user: 'cs361_hughesc3',
	password: 'group8goodfit',
	database: 'cs361_hughesc3'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.engine('ejs', engines.ejs);
app.engine('handlebars', engines.handlebars);



// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/accountOptions', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);





app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(express.static('views/layouts'));
app.use(express.static('public'));


app.get('/', function(request, response) {
	
            response.render('home.ejs');
});
	



/*
app.get('/',function(req,res){
    res.render('home');

});
*/

//
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));



app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM players WHERE user_name = ? AND number = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/accountOptions', getHomePage);




app.get('/home', function(request, response) {
	
	let query = "SELECT * FROM `players` where user_name = '" + request.session.username + "'";
	db.query(query, (err, result) => {
            if (err) {
                response.redirect('/');
            }
            response.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result
            });
        });
	
	/*if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
	*/
});




//


app.get('/accountOptions',function(req,res){
  res.render('accountOptions');
});


app.get('/search',function(req,res){
  res.render('search');
});

app.get('/housingGuide',function(req,res){
  res.render('housingGuide');
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
