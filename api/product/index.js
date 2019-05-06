module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/product',
        middleware.checkInput,
        controller.list);
    router.post('/product',
        middleware.checkInputProduct,
        controller.add)
    router.put('/product',
        middleware.checkInputProduct,
        middleware.checkIdProduct,
        middleware.checkAvailableProduct,
        controller.update)
    router.delete('/product',
        middleware.checkIdProduct,
        controller.remove)
  };
  