const path = require('path');

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

//Page Listeners
var router = function(app) {
    app.get('/', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
    })

    app.get('/login', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
    })

    app.get('/studentDB', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/student/studentDB.html'));
    })

    app.get('/signUp', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/signUp.html'));
    })

    app.get('/crab.png', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/crab.png'));
    })

    app.get('/home', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/student/home.html'));
    })

    app.get('/homeCompany', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/company/homeCompany.html'));
    })

    app.get('/settings', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/student/settings.html'));
    })

    app.get('/companySettings', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/company/companySettings.html'));
    })

    app.get('/companyLogin', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/companyLogin.html'));
    })

    app.get('/companyDB', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/company/companyDB.html'));
    })

    app.get('/adminDB', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/admin/adminDB.html'));
    })

};

module.exports = router;