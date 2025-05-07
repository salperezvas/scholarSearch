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

        const sql = "SELECT * FROM Scholarships";
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

    app.get('/showStudentAccounts', (req, res) => {

        const sql = "SELECT * FROM Students";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/showCompanyAccount', (req, res) => {

        const sql = "SELECT * FROM Companies";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.delete('/deleteAccount/:id', (req, res) => {
        const accountId = req.params.id;
        const sql = "DELETE FROM Students WHERE student_id = ?";
        
        connection.query(sql, [accountId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Account deleted successfully" });
        });
    });

    app.delete('/deleteCopmanyAccount/:id', (req, res) => {
        const accountId = req.params.id;
        const sql = "DELETE FROM Companies WHERE company_id = ?";
        
        connection.query(sql, [accountId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Account deleted successfully" });
        });
    });

    app.get('/showStudentAccounts', (req, res) => {

        const sql = "SELECT * FROM Students";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/showEveryScholarships', (req, res) => {

        const sql = "SELECT * FROM Scholarships";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/scholarshipPending', (req, res) => {

        const sql = "SELECT * FROM Scholarships WHERE status = 'pending'";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.get('/rejectedScholarships', (req, res) => {

        const sql = "SELECT * FROM Scholarships WHERE status = 'denied'";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.post('/rejectScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;

        const sql = "UPDATE Scholarships SET `status` = 'denied' WHERE (`scholarship_id` = ?);";
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Scholarship rejected successfully" });
        });
    });

    app.post('/approveScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;

        const sql = "UPDATE Scholarships SET `status` = 'approved' WHERE (`scholarship_id` = ?);";
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Scholarship approved successfully" });
        });
    });

    app.get('/accountPending', (req, res) => {

        const sql = "SELECT * FROM Students WHERE company_request_status = 'requested'";
        connection.query(sql, (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            res.status(200).json(results);
        });
    });

    app.post('/rejectAccount/:id', (req, res) => {
        const scholarshipId = req.params.id;

        const sql = "UPDATE Students SET `company_request_status` = 'denied' WHERE (`student_id` = ?);";
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Account rejected successfully" });
        });
    });

    app.post('/approveAccount/:id', (req, res) => {
        const scholarshipId = req.params.id;

        const sql = "UPDATE Students SET `company_request_status` = 'approved' WHERE (`student_id` = ?);";
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            res.status(200).json({ msg: "Account approved successfully" });
        });
    });

    app.get('/showAppliedScholarships', (req, res) => {

        const id = req.session.user.student_id;

        const sql = "SELECT * FROM Applications WHERE student_id = ?";
        connection.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            const scholarshipIDs = [];
            results.forEach(result => {
                scholarshipIDs.push(result.scholarship_id);
            });

            if (scholarshipIDs.length == 0) {
                return res.status(200).json([]);
            }
            
            const sql2 = "SELECT * FROM Scholarships WHERE scholarship_id IN (?)";
            connection.query(sql2, [scholarshipIDs], (err, results) => {
                if (err) {
                    return res.status(200).json({ msg: "Database error", error: err });
                }
                res.status(200).json(results);
            });
        });
    });

    app.post('/saveScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;
        const studentId = req.session.user.student_id;

        const sql = "INSERT INTO SavedScholarships (`application_id`, `student_id`) VALUES (?, ?);;";
        console.log("studentId:", studentId);
        console.log("scholarshipId:", scholarshipId);
        
        connection.query(sql, [scholarshipId, studentId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            console.log("result:", result);
            res.status(200).json({ msg: "Scholarship saved successfully" });
        });
    });

    app.get('/showSavedScholarships', (req, res) => {
        const id = req.session.user.student_id;

        const sql = "SELECT * FROM SavedScholarships WHERE student_id = ?";
        connection.query(sql, [id], (err, results) => {
            if (err) {
                return res.status(200).json({ msg: "Database error", error: err });
            }

            const scholarshipIDs = [];
            results.forEach(result => {
                scholarshipIDs.push(result.application_id);
            });

            if (scholarshipIDs.length == 0) {
                return res.status(200).json([]);
            }
            
            const sql2 = "SELECT * FROM Scholarships WHERE scholarship_id IN (?)";
            connection.query(sql2, [scholarshipIDs], (err, results) => {
                if (err) {
                    return res.status(200).json({ msg: "Database error", error: err });
                }
                res.status(200).json(results);
            });
        });
    });

    app.post('/reportScholarship/:id', (req, res) => {
        const scholarshipId = req.params.id;
        const sql = "INSERT INTO Reports (`scholarship_id`) VALUES (?);;";
        
        connection.query(sql, [scholarshipId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ msg: "Database error", error: err });
            }
            console.log("result:", result);
            res.status(200).json({ msg: "Scholarship reported successfully" });
        });
    });

};

module.exports = services;