const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = (lib) => {

    function login(req, res) {
        return res.status(200).json({ message: "successful login" }).end();
    }

    function logout(req, res) {
        req.logout();
        console.log(req.isAuthenticated())
        return res.status(200).json({ message: "successful logout" }).end();
    }

    function register(req, res) {
        const auth = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt),
            member_id: req.body.member_id
        };

        lib.auth.add(auth)
            .then(result => {
                return res.status(200).json(result).end();
            }).catch(err => {
                return res.status(500).end();
            });
    }

    return {
        login,
        logout,
        register
    }
}