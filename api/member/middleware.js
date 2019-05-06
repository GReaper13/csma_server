let utils = require("../../utils");
module.exports = () => {
    return {
        checkIdMember,
        checkInputMember,
        checkStatus
    }

    function checkInputMember(req, res, next) {
        if (!utils.checkObj(req.body.name) || !utils.checkObj(req.body.address) || !utils.checkObj(req.body.phone_number)
        || !utils.checkObj(req.body.role_id) || !utils.checkObj(req.body.salary) || !utils.checkObj(req.body.store_id)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdMember(req, res, next) {
        if (!utils.checkObj(req.body.id)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkStatus(req, res, next) {
        if (!utils.checkObj(req.body.status)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }
}
  