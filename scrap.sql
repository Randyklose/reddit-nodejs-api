INSERT INTO 
    posts
    VALUES (
    null, "my name is reddit", "https://www.noob.com", 1, "2017-01-01", "2017-01-01"
    ),
    (null, "Reddit moi", "https://www.noobz.com", 2, "2017-01-01","2017-01-01");
    
    INSERT INTO 
    users
    VALUES (
    null, "noobs", "password", "2017-01-01", "2017-01-01"
    ),
    (null, "BoomShakalaka", "password1", "2017-01-01","2017-01-01");
    
    
    CREATE TABLE subreddits 
    (id int auto_increment primary key,
    name varchar(30) NOT NULL,
    description varchar(300),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME ,
    UNIQUE (name));
    
    ALTER TABLE posts 
        ADD COLUMN subredditId INT;
    ALTER TABLE posts
        ADD FOREIGN KEY (`subredditId`)
        REFERENCES 
        subreddits(`id`);