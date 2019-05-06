let utils = require("../../utils")
module.exports = (lib) => {
    return {
        list,
        add,
        update,
        remove

    };

    async function list(req, res) {
        let result = await lib.export_detail.list(req.query);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000),
            data: result
        });
    }

    async function add(req, res) {
        try {
            let result = await lib.export_detail.add(req.body);
            res.json({
                code: 1000,
                message: utils.getMessageOfCode(1000)
            });
        } catch (e) {
            res.json({
                code: 10002,
                message: utils.getMessageOfCode(10002)
            });
        }
        
    }

    async function update(req, res) {
        let result = await lib.export_detail.update(req.body);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000)
        });
    }

    async function remove(req, res) {
        let result = await lib.export_detail.remove(req.body);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000)
        });
    }
}