module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/import_detail',
        controller.list);
    router.post('/import_detail',
        middleware.checkInsert,
        controller.add)
    router.put('/import_detail',
        middleware.checkIdImportDetail,
        middleware.checkInputImportDetail,
        controller.update)
    router.delete('/import_detail',
        middleware.checkIdImportDetail,
        controller.remove)
  };
  