var bcrypt = require('bcrypt');
var HASH_ROUNDS = 10;

module.exports = function RedditAPI(conn) {
        return {
            createUser: function(user) {

                // first we have to hash the password...
                return bcrypt.hash(user.password, HASH_ROUNDS)
                    .then(function(hashedPassword) {
                        return conn.query(
                            'INSERT INTO users (username,password, createdAt) VALUES (?, ?, ?)', [user.username, hashedPassword, new Date()]);
                    })
                    .catch(function(err) {
                        if (err) {
                            if (err.code === 'ER_DUP_ENTRY') {
                                throw (new Error('A user with this username already exists'));
                            }
                            else {
                                return (err);
                            }
                        }
                    })
                    .then(function(result) {
                        return conn.query(
                            'SELECT id, username, createdAt, updatedAt FROM users WHERE id = ?', [result.insertId]);
                    })
                    .then(function(result) {
                        return (null, result[0]);
                    });
            },


            createPost: function(post) {
                return conn.query(
                        'INSERT INTO posts (userId, title, url, createdAt) VALUES (?, ?, ?, ?)', [post.userId, post.title, post.url, new Date()])
                    .then(function(result) {
                        return conn.query(
                            'SELECT id,title,url,userId, createdAt, updatedAt FROM posts WHERE id = ?', [result.insertId]);
                    })
                    .then(function(result) {
                        return (result[0]);
                    })
                    .catch(function(err) {
                        return err;
                    });

            },
            getAllPosts: function(options) {
                    // In case we are called without an options parameter, shift all the parameters manually

                    var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
                    var offset = (options.page || 0) * limit;

                    return conn.query(`
        SELECT posts.id as postId, posts.title as postTitle,
        posts.url, posts.userId as pUserId, posts.createdAt as postCreatedAt,
        posts.updatedAt as postUpdatedAt, users.id as userId, users.username,
        users.createdAt as userCreatedAt, users.updatedAt as userUpdatedAt
        
        FROM posts JOIN users ON posts.userId = users.id
        ORDER BY posts.createdAt DESC
        LIMIT ? OFFSET ?`, [limit, offset])
                        .then(function(results) {
                            return (results);
                        })
                        .catch(function(err) {
                                return err;
                            });
        }
};
};
        
