let utils = require("../../utils");
module.exports = () => {
    return {
      checkInput,
      checkIdProduct,
      checkInputProduct,
      checkAvailableProduct
    }
  
    function checkInput(req, res, next) {
        if (!utils.checkObj(req.query.index) || !utils.checkObj(req.query.count)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkInputProduct(req, res, next) {
        if (!utils.checkObj(req.body.name) || !utils.checkObj(req.body.description) || !utils.checkObj(req.body.import_price)
        || !utils.checkObj(req.body.export_price)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkIdProduct(req, res, next) {
        if (!utils.checkObj(req.body.id)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }

    function checkAvailableProduct(req, res, next) {
        if (!utils.checkObj(req.body.available)) {
            res.json({
                code: 10007,
                message: utils.getMessageOfCode(10007)
            })
        } else {
            next();
        }
    }
}
  