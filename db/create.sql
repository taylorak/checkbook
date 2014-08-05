DROP TABLE IF EXISTS user;
CREATE TABLE user
(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
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

INSERT INTO user(username, email,password) VALUES
    ("user", "user@user.com", "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"),
    ("admin", "admin@admin.com", "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8");
