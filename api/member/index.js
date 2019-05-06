module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/member',
        controller.list);
    router.post('/member',
        middleware.checkInputMember,
        controller.add)
    router.put('/member',
        middleware.checkInputMember,
        middleware.checkIdMember,
        middleware.checkStatus,
        controller.update)
    router.delete('/member',
        middleware.checkIdMember,
        controller.remove)
  };
  