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
};

module.exports = router;