const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'scholarSearchDB'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connection established');
});

var services = function(app) {
    app.post('/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({ msg: "Please enter username and password" });
        }

        const sql = "SELECT * FROM students WHERE username = ? AND password = ?";

        connection.query(sql, [username, password], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            if (results.length > 0) {
                res.status(200).json({ msg: "Login successful", user: results[0] });
            } else {
                res.status(200).json({ msg: "Invalid username or password" });
            }
        });
    });

    app.post('/signUp', (req, res) => {
        const { username, password, name, email, lastName } = req.body;

        const checkUserSql = "SELECT * FROM students WHERE username = ?";
    
        connection.query(checkUserSql, [username], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }
    
            if (results.length > 0) {
                return res.status(200).json({ msg: "Username already exists" });
            }
    
            const insertSql = "INSERT INTO students (name, lastName, email, username, password) VALUES (?, ?, ?, ?, ?)";
    
            connection.query(insertSql, [name, lastName, email, username, password], (err, result) => {
                if (err) {
                    return res.status(200).json({ msg: "Error inserting user", error: err });
                }
    
                res.status(200).json({ msg: "User registered successfully", userId: result.insertId });
            });
        });
    });
};

module.exports = services;