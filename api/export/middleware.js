let utils = require("../../utils");
module.exports = () => {
    return {
        checkInputExport,
        checkIdExport
    }

    function checkInputExport(req, res, next) {
        if (!utils.checkObj(req.body.staff_id) || !utils.checkObj(req.body.date)|| !utils.checkObj(req.body.customer_id)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdExport(req, res, next) {
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
  