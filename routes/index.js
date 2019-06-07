module.exports = {
    getHomePage: (req, res) => {
        //let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
		
		var username = request.body.username;
		let query = "SELECT * FROM `players` where user_name = '" + username + "'"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Socka | View Players"
                ,players: result
            });
        });
    },
};
/*
var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	}
	
*/