DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    salt TEXT
);

DROP TABLE IF EXISTS checkbook_entry;
CREATE TABLE checkbook_entry
(
    entry_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date INTEGER,
    payee TEXT,
    amount INTEGER,
    memo TEXT,
    category TEXT,
    FOREIGN KEY(user_id) REFERENCES user
);

INSERT INTO user(username, email, password, salt) VALUES
    (
        "user", 
        "user@user.com", 
        "$2a$12$UT1/4NMUqR3ISBtHSWrTNe6ldx6TDCHmU90xAv.V04w8LuSeYEvW2",
        "$2a$12$UT1/4NMUqR3ISBtHSWrTNe"
    ),
    (
        "admin", 
        "admin@admin.com", 
        "$2a$12$UT1/4NMUqR3ISBtHSWrTNe6ldx6TDCHmU90xAv.V04w8LuSeYEvW2",
        "$2a$12$UT1/4NMUqR3ISBtHSWrTNe"
    );
