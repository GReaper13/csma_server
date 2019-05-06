const passport = require('passport')
module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')(lib);
    
    router.post('/login', 
        middleware.authenticate,
        controller.login);
    
    router.post('/register',
        middleware.checkUserExist,
        controller.register)
    
    router.get('/logout',
        middleware.checkAuthenticate,
        controller.logout)
};
    