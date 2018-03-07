// import packages
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();
var TEST_TOKEN = require('./config.js')

/* the instagram-node API call

ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {});

*/

// configure app
app.use(express.static(__dirname + '/public'));

// set view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with access token
// WIP
ig.use({
	// get access token here: http://instagram.pixelunion.net/
	access_token: TEST_TOKEN.access_token,
});

// set the routes

// home page - our profile's images
app.get('/', function(req, res) {
	// use the instagram package to get our profile's media
	ig.user_self_media_recent(function(err, medias, pagination, remaining, limit) {
		// render the home page and pass in our profile's images
		res.render('pages/index', { grams: medias });
	});
});

// start the server
app.listen(3030);
console.log('App started! look at http://localhost:3030');