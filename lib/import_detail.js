let utils = require("../utils")
module.exports = db => {
    return {
        list,
        add,
        update,
        remove
    };
    function list (options) {
        return new Promise(function(resolve, reject) {
            let add_codition = " WHERE 1 ";
            if (utils.checkObj(options.id)) {
                add_codition = add_codition + " AND id = " + utils.convertToValue(options.id);
            }
            if (utils.checkObj(options.import_id)) {
                add_codition = add_codition + " AND import_id = " + utils.convertToValue(options.import_id);
            }
            if (utils.checkObj(options.product_id)) {
                add_codition = add_codition + " AND product_id = " + utils.convertToValue(options.product_id);
            }
            if (utils.checkObj(options.lowest_count)) {
                add_codition = add_codition + " AND count >= " + utils.convertToValue(options.lowest_count);
            }
            if (utils.checkObj(options.highest_count)) {
                add_codition = add_codition + " AND count <= " + utils.convertToValue(options.highest_count);
            }
            let sql = "SELECT * FROM import_detail" + add_codition + " ORDER BY id DESC";
            db.query(sql, function(err, result, field) {
				if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(import_details) {
        return new Promise(function(resolve, reject) {
            if (import_details.constructor != Array) {
                return reject(10002);
            }
            let insertCondition = "";
            import_details.forEach(import_detail => {
                if (!utils.checkObj(import_detail.import_id) || !utils.checkObj(import_detail.product_id) || !utils.checkObj(import_detail.count)) {
                    return reject(10002);
                }
                insertCondition = insertCondition + "(NULL, " + utils.convertToValue(import_detail.import_id) + ", " + utils.convertToValue(import_detail.product_id) + ", " + utils.convertToValue(import_detail.count) + "),";
            });
            insertCondition = insertCondition.slice(0, -1);
            let sql = "INSERT INTO import_detail VALUES " + insertCondition;
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(import_detail) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE import_detail SET import_id = " + utils.convertToValue(import_detail.import_id) + ", product_id = " + utils.convertToValue(import_detail.product_id)
            + ", count = " + utils.convertToValue(import_detail.count) + " WHERE id = " + utils.convertToValue(import_detail.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(import_detail) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM import_detail WHERE id = " + utils.convertToValue(import_detail.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}