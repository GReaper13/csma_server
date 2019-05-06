const express = require('express');
const router = express.Router();

module.exports = lib => {
    // đăng ký các api tại đây
    require('./auth')(router, lib);
    require('./product')(router, lib);
    require('./member')(router, lib);
    require('./customer')(router, lib);
    require('./store')(router, lib);
    require('./import')(router, lib);
    require('./import_detail')(router, lib);
    require('./export')(router, lib);
    require('./export_detail')(router, lib);
    return router
}
