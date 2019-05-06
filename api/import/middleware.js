let utils = require("../../utils");
module.exports = () => {
    return {
        checkIdImport,
        checkInputImport
    }

    function checkInputImport(req, res, next) {
        if (!utils.checkObj(req.body.manager_id) || !utils.checkObj(req.body.date)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdImport(req, res, next) {
        if (!utils.checkObj(req.body.id)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }
}
  