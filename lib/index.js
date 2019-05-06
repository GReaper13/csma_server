module.exports = db => {
    const auth = require('./auth')(db);
    const product = require('./product')(db);
    const member = require('./member')(db);
    const customer = require('./customer')(db);
    const store = require('./store')(db);
    const importCSMA = require('./import')(db);
    const import_detail = require('./import_detail')(db);
    const exportCSMA = require('./export')(db);
    const export_detail = require('./export_detail')(db);

    return {
        auth,
        product,
        member,
        customer,
        store,
        importCSMA,
        import_detail,
        exportCSMA,
        export_detail
    }
};
