let utils = require("../../utils");
module.exports = () => {
    return {
        checkIdStore,
        checkInputStore
    }

    function checkInputStore(req, res, next) {
        if (!utils.checkObj(req.body.name) || !utils.checkObj(req.body.address)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdStore(req, res, next) {
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
  