module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/import',
        controller.list);
    router.post('/import',
        middleware.checkInputImport,
        controller.add)
    router.put('/import',
        middleware.checkInputImport,
        middleware.checkIdImport,
        controller.update)
    router.delete('/import',
        middleware.checkIdImport,
        controller.remove)
  };
  