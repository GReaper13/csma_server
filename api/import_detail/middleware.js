let utils = require("../../utils");
module.exports = () => {
    return {
        checkInsert,
        checkIdImportDetail,
        checkInputImportDetail
    }

    function checkInsert(req, res, next) {
        if (!utils.checkObj(req.body)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkInputImportDetail(req, res, next) {
        if (!utils.checkObj(req.body.import_id) || !utils.checkObj(req.body.product_id) || !utils.checkObj(req.body.count)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdImportDetail(req, res, next) {
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
  