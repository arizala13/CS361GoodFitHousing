var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(express.static('views/layouts'));
app.use(express.static('public'));

app.get('/',function(req,res){
    res.render('home');

});

// User Account Creation and Authenticaton
app.post('/accountOptions', (req, res) => {
  // Check if user already exists
  db.query('SELECT * FROM users WHERE email="' + req.body.username + '"', (err, result) => {
    if (result.length > 1) {
      console.log(result)
      res.send('Account already exists.')
    } else {
      // Add user to DB
      let query = 'INSERT INTO users (firstname, lastname, email, password) VALUES ("' + req.body.firstName + '", "' + req.body.lastName + '", "' + req.body.userName + '", "' + req.body.password + ' ");'
      db.query(query, (err, result) => {
        res.send('Done!')
      })
    }
  })
})


app.get('/accountOptions',function(req,res){
  res.render('accountOptions');
});

app.get('/search',function(req,res){
  res.render('search');
});

app.get('/housingGuide',function(req,res){
  res.render('housingGuide');
});

/*
app.get('/accountOptions',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM users', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    sendfile.render('home', context);
  });
});
*/

/*
app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM users WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.render('home',context);
  });
});


///simple-update?id=2&name=The+Task&done=false&due=2015-12-5
app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE users SET name=?, done=?, due=? WHERE id=? ",
    [req.query.name, req.query.done, req.query.due, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

///safe-update?id=1&name=The+Task&done=false
app.get('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE todo SET name=?, done=?, due=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.done || curVals.done, req.query.due || curVals.due, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home',context);
      });
    }
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS todo", function(err){
    var createString = "CREATE TABLE todo(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

*/
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
