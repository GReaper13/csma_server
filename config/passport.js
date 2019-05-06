var bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local').Strategy
var passport = require('passport');

module.exports = (lib) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        var options = {};
        options.id = id;

        lib.auth.list(options, false)
            .then(auth => {
                return done(null, auth);
            }).catch(err => {
                return done(err)
            });
    })

    passport.use(new LocalStrategy(
        function (username, password, done) {
            var options = {};
            options.username = username;

            lib.auth.list(options, false)
                .then(auth => {
                    if(!auth) return done(null, null, { message: 'Username has not been registered' });
                    if(!bcrypt.compareSync(password, auth.password)) return done(null, null, { message: 'Password is incorrect' });
                    return done(null, auth)
                }).catch(err => {
                    return done(err)
                });
        }
    ))
}