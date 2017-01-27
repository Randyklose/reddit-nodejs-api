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
                    return (result[0]);
                });
        },


        createPost: function(post) {
            return conn.query(
                    'INSERT INTO posts (userId, title, url, createdAt) VALUES (?, ?, ?, ?)', [post.userId, post.title, post.url, new Date()])
                .then(function(result) {
                    console.log(result)
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
        getAllPosts: function(options, id) {
            // In case we are called without an options parameter, shift all the parameters manually

            var limit = options.numPerPage || 25; // if options.numPerPage is "falsy" then use 25
            var offset = (options.page || 0) * limit;

            return conn.query(`
        SELECT posts.id as postId, posts.title as postTitle,
        posts.url, users.username as username
        
        FROM posts JOIN users ON posts.userId = users.id
        WHERE posts.id = ?
        LIMIT ? OFFSET ?`, [id, limit, offset])
                .then(function(results) {
                    return (results);
                })
                .catch(function(err) {
                    return err;
                });
        },

        createSubreddit: function createSubreddit(sub) {
            return conn.query(
                    'INSERT INTO subreddits (id, name, description, createdAt) VALUES (?, ?, ?, ?)', [sub.id, sub.name, sub.description, new Date()])
                .then(function(result) {
                    return conn.query(
                        'SELECT id, name, description, createdAt, updatedAt FROM subreddits WHERE id = ?', [result.insertId]);
                })
                .then(function(result) {
                    return (result[0]);
                })
                .catch(function(err) {
                    console.log("Error at the subreddit:", err)
                });

        }
    };
};
