module.exports = (router, lib) => {
    const controller = require('./controller')(lib);
    const middleware = require('./middleware')();
    
    router.get('/customer',
        controller.list);
    router.post('/customer',
        middleware.checkInputCustomer,
        controller.add)
    router.put('/customer',
        middleware.checkInputCustomer,
        middleware.checkIdCustomer,
        controller.update)
    router.delete('/customer',
        middleware.checkIdCustomer,
        controller.remove)
  };
  