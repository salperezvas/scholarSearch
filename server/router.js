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
        res.status(200).sendFile(path.join(__dirname, '../client/studentDB.html'));
    })

    app.get('/signUp', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/signUp.html'));
    })

    app.get('/crab.png', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/crab.png'));
    })

    app.get('/home', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/home.html'));
    })

    app.get('/settings', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/settings.html'));
    })

    app.get('/companyLogin', function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/companyLogin.html'));
    })

    app.get('/companyDB', isAuthenticated, function(req, res) {
        res.status(200).sendFile(path.join(__dirname, '../client/companyDB.html'));
    })
};

module.exports = router;