const passport = require('passport')

module.exports = lib => {
    function authenticate(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if(err) return res.status(500).end();
            if(!user) return res.status(401).json(info).end();
            req.login(user, err => {
                if(err) return res.status(500).end();
                next();
            });
        })(req, res, next);
    }

    function checkAuthenticate(req, res, next) {
        if(!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized"});
        next();
    }

    function checkUserExist(req, res, next) {
        const options = {
            id: req.body.id,
            username: req.body.username
        };

        lib.auth.list(options, false)
            .then(user => {
                if(user) return res.status(400).json({message: "User already exists"}).end();
                else next();
            }).catch(err => {
                return res.status(500).end();
            });
    }
   
    return {
        authenticate,
        checkAuthenticate,
        checkUserExist
    }
}