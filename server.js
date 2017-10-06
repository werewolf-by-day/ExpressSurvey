//dependencies
var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");

//creates express app
var app = express();

//handles session
app.use(session({ secret: 'keepitsecretkeepitsafe'}));
//handles static content
app.use(express.static(path.join(__dirname, './static')));
//handles POST data
app.use(bodyParser.urlencoded({ extended: true }));

//for ejs use and views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//root route
app.get('/', function(req, res) {
	res.render('index');
});


//applying session to results and redirect
app.post('/process', function(req, res) {
	req.session.result = req.body;
	res.redirect('/result')

});

//post results
app.get('/result', function(req, res) {
	var result = {
		name: req.session.result.name,
		location: req.session.result.location,
		fav_language: req.session.result.fav_language,
		comment: req.session.result.comment
	};
	res.render('result', {result: result});
})

app.listen(8000, function() {
	console.log('listening on port 8000, like a boss');
});