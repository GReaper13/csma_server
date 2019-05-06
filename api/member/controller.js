let utils = require("../../utils")
module.exports = (lib) => {
    return {
        list,
        add,
        update,
        remove

    };

    async function list(req, res) {
        let result = await lib.member.list(req.query);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000),
            data: result
        });
    }

    async function add(req, res) {
        let result = await lib.member.add(req.body);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000)
        });
    }

    async function update(req, res) {
        let result = await lib.member.update(req.body);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000)
        });
    }

    async function remove(req, res) {
        let result = await lib.member.remove(req.body);
        res.json({
            code: 1000,
            message: utils.getMessageOfCode(1000)
        });
    }
}