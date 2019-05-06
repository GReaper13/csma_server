let utils = require("../../utils");
module.exports = () => {
    return {
        checkIdCustomer,
        checkInputCustomer
    }

    function checkInputCustomer(req, res, next) {
        if (!utils.checkObj(req.body.name) || !utils.checkObj(req.body.phone) || !utils.checkObj(req.body.dob)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdCustomer(req, res, next) {
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
  