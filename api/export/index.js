module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/export',
        controller.list);
    router.post('/export',
        middleware.checkInputExport,
        controller.add)
    router.put('/export',
        middleware.checkInputExport,
        middleware.checkIdExport,
        controller.update)
    router.delete('/export',
        middleware.checkIdExport,
        controller.remove)
  };
  