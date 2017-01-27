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

//GET ALL POSTS
// function getAllPosts() {
// return redditAPI.getAllPosts({})
// .then(function(result){
  
//   var posts= [];
//   result.forEach(function(row){
//     var post = posts.find(function(post){
//           return post.userId === row.userId;
//     })
  
//   if(!post) {
//     post = {
//       id:row.postId,
//       title:row.postTitle,
//       url:row.url,
//       createdAt:row.postCreatedAt,
//       UpdatedAt:row.postUpdatedAt,
//       UserId:row.pUserId,
//       user:[]
//     }

//       posts.push(post)
//   }
//       post.user.push({
//       id:row.userId,
//       username:row.username,
//       createdAt:row.userCreatedAt,
//       updatedAt:row.userUpdatedAt
//     })
  
// })
// return posts;
// })
// .then(function(result){
//   console.log(JSON.stringify(result,null,4));
//   connection.end();
//   })
// }

//GET ALL POST FOR A SPECIFIC USER

// function getAllPostsForUser() {
// return redditAPI.getAllPosts({},2)
// .then(function(result){
  
//   var posts= [];
//   result.forEach(function(row){
//     var post = posts.find(function(post){
//           return post.userId === row.userId;
//     })
  
//   if(!post) {
//     post = {
//       id:row.postId,
//       title:row.postTitle,
//       url:row.url,
//       createdAt:row.postCreatedAt,
//       UpdatedAt:row.postUpdatedAt,
//       UserId:row.pUserId,
//       user:[]
//     }

//       posts.push(post)
//   }
//       post.user.push({
//       id:row.userId,
//       username:row.username,
//       createdAt:row.userCreatedAt,
//       updatedAt:row.userUpdatedAt
//     })
  
// })
// return posts;
// })
// // .then(function(result){
// //   console.log(JSON.stringify(result,null,4));
// //   connection.end();
// //   })
// }

// getAllPostsForUser()
// .then(function(result){
//   console.log(JSON.stringify(result,null,4));
//   connection.end();
//   })

// GET SINGLE POST BY POST ID 

// function getSinglePost() {
  
//   return redditAPI.getAllPosts({},1)
// .then(function(result){
  
// var obj = result[0];
// return obj
// })
// }

// getSinglePost()
// .then(function(result) {
//   console.log(JSON.stringify(result,null,4))
//   connection.end()
// })

//CREATE NEW SUBREDDITS

// redditAPI.createSubreddit({
//   id:1,
//   name:"POPO",
//   description:null,
//   createdAt:"2018-01-01",
//   updatedAt:null
// })
// .then(function(result){
//   console.log(result)
//   connection.end()
// })
// .catch(function(err) {
//   console.log(err)
//   connection.end()
// })


// GET ALL SUBREDITS CALL FUNCTION

// redditAPI.getAllSubreddits({})
// .then(function(result){
//   console.log(result)
//   connection.end()
// CREATE POST WITH SUBREDITS

// redditAPI.createPost({
//       title: 'hi reddit! wuddup',
//       url: 'https://www.reddit.com',
//       userId: null,
//       subredditId: 3
//     })
//      .then(function(result){
//   console.log(result)
//   connection.end()
// })
// .catch(function(err) {
//   console.log(err)
//   connection.end()
// })


