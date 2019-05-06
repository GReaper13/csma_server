module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/export_detail',
        controller.list);
    router.post('/export_detail',
        middleware.checkInsert,
        controller.add)
    router.put('/export_detail',
        middleware.checkIdExportDetail,
        middleware.checkInputExportDetail,
        controller.update)
    router.delete('/export_detail',
        middleware.checkIdExportDetail,
        controller.remove)
  };
  