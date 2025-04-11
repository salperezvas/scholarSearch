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
                req.session.user = {
                    student_id: results[0].student_id,
                    username: results[0].username,
                    name: results[0].name,
                    email: results[0].email
                };
                
                res.status(200).json({ msg: "Login successful", user: results[0] });
            } else {
                res.status(200).json({ msg: "Invalid username or password" });
            }
        });
    });

    app.post('/companyLogin', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({ msg: "Please enter username and password" });
        }

        const sql = "SELECT * FROM Companies WHERE username = ? AND password = ?";

        connection.query(sql, [username, password], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            if (results.length > 0) {
                req.session.user = {
                    company_id: results[0].company_id,
                    username: results[0].username,
                    name: results[0].name,
                    email: results[0].email
                };
                
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

    app.get('/getUserData', (req, res) => {
        if (req.session.user) {
            res.status(200).json({ user: req.session.user });
        } else {
            res.status(200).json({ error: "Not authenticated" });
        }
    });

    app.post('/signout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(200).json({ success: false, error: "Could not sign out" });
            }
            res.clearCookie("connect.sid");
            res.json({ success: true, message: "Signed out successfully" });
        });
    });

    app.get('/showScholarships', (req, res) => {

        const sql = "SELECT title, description, amount FROM Scholarships ORDER BY RAND() LIMIT 9";

        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });
};

module.exports = services;