module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/store',
        controller.list);
    router.post('/store',
        middleware.checkInputStore,
        controller.add)
    router.put('/store',
        middleware.checkInputStore,
        middleware.checkIdStore,
        controller.update)
    router.delete('/store',
        middleware.checkIdStore,
        controller.remove)
  };
  