const mysql = require('mysql2');
const adminIds = [1];

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

                if (req.session.user && adminIds.includes(req.session.user.company_id)) {
                    res.status(200).json({ msg: "Admin Login successful", user: results[0] });
                }
                else{
                    res.status(200).json({ msg: "Login successful", user: results[0] });
                }
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

        const sql = "SELECT title, description, scholarship_id, amount FROM Scholarships WHERE status = 'approved' ORDER BY RAND() LIMIT 9";

        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/showApprovedScholarships', (req, res) => {
        const id = req.session.user.company_id;

        const sql = "SELECT title, description, amount, scholarship_id FROM Scholarships WHERE company_id = ? AND status = 'approved'";
        connection.query(sql, id, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/showRejectedScholarships', (req, res) => {
        const id = req.session.user.company_id;

        const sql = "SELECT title, description, scholarship_id, amount FROM Scholarships WHERE company_id = ? AND status = 'denied'";
        connection.query(sql, id, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/showPendingScholarships', (req, res) => {
        const id = req.session.user.company_id;

        const sql = "SELECT title, description, scholarship_id, amount FROM Scholarships WHERE company_id = ? AND status = 'pending'";
        connection.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.delete('/deleteScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;
        const sql = "DELETE FROM Scholarships WHERE scholarship_id = ?";
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Scholarship deleted successfully" });
        });
    });

    app.get('/showAllScholarships', (req, res) => {

        const id = req.session.user.company_id;

        const sql = "SELECT title, description, amount, scholarship_id FROM Scholarships WHERE company_id = ?";
        connection.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.post('/uploadScholarships', (req, res) => {
        const { title, description, amount, deadline } = req.body;
        const id = req.session.user.company_id;

        const sql = "INSERT INTO Scholarships (title, description, amount, deadline, company_id, status) VALUES (?, ?, ?, ?, ?, 'pending')";
        
        connection.query(sql, [title, description, amount, deadline, id], (err, result) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json({ msg: "Scholarship uploaded successfully"});
        });
    });

    app.get('/searchScholarship', (req, res) => {
        const title = req.query.title;

        const sql = "SELECT title, description, amount, scholarship_id FROM Scholarships WHERE title LIKE ? OR description LIKE ? AND status = 'approved'";
        
        const likeTitle = `%${title}%`;

        connection.query(sql, [likeTitle, likeTitle], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.post('/applyScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;
        const studentId = req.session.user.student_id;

        const sql = "INSERT INTO Applications (student_id, scholarship_id) VALUES (?, ?)";
        console.log("studentId:", studentId);
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [studentId, scholarshipId], (err, result) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }
            console.log("result:", result);
            res.status(200).json({ msg: "Application submitted successfully" });
        });
    });
};

module.exports = services;