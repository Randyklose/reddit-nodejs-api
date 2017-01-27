// load the mysql library
var mysql = require('promise-mysql');


// create a connection to our Cloud9 server
var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'randyk', // CHANGE THIS :)
  password : '',
  database: 'reddit'
});

// load our API and pass it the connection
var reddit = require('./reddit');
var redditAPI = reddit(connection);

// It's request time!


redditAPI.getAllPost({}).then(function(result) {
  console.log(result)
})
