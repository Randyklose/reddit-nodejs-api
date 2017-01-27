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

function getAllPostsForUser() {
return redditAPI.getAllPosts({},2)
.then(function(result){
  
  var posts= [];
  result.forEach(function(row){
    var post = posts.find(function(post){
           return post.userId === row.userId;
    })
  
  if(!post) {
    post = {
      id:row.postId,
      title:row.postTitle,
      url:row.url,
      createdAt:row.postCreatedAt,
      UpdatedAt:row.postUpdatedAt,
      UserId:row.pUserId,
      user:[]
    }

      posts.push(post)
  }
      post.user.push({
      id:row.userId,
      username:row.username,
      createdAt:row.userCreatedAt,
      updatedAt:row.userUpdatedAt
    })
  
})
return posts;
})
// .then(function(result){
//   console.log(JSON.stringify(result,null,4));
//   connection.end();
//   })
}

getAllPostsForUser()
.then(function(result){
  console.log(JSON.stringify(result,null,4));
  connection.end();
  })