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
            if (utils.checkObj(options.export_id)) {
                add_codition = add_codition + " AND export_id = " + utils.convertToValue(options.export_id);
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
            let sql = "SELECT * FROM export_detail" + add_codition + " ORDER BY id DESC";
            db.query(sql, function(err, result, field) {
				if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(export_details) {
        return new Promise(function(resolve, reject) {
            if (export_details.constructor != Array) {
                return reject(10002);
            }
            let insertCondition = "";
            export_details.forEach(export_detail => {
                if (!utils.checkObj(export_detail.export_id) || !utils.checkObj(export_detail.product_id) || !utils.checkObj(export_detail.count)) {
                    return reject(10002);
                }
                insertCondition = insertCondition + "(NULL, " + utils.convertToValue(export_detail.export_id) + ", " + utils.convertToValue(export_detail.product_id) + ", " + utils.convertToValue(export_detail.count) + "),";
            });
            insertCondition = insertCondition.slice(0, -1);
            let sql = "INSERT INTO export_detail VALUES " + insertCondition;
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(export_detail) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE export_detail SET export_id = " + utils.convertToValue(export_detail.export_id) + ", product_id = " + utils.convertToValue(export_detail.product_id)
            + ", count = " + utils.convertToValue(export_detail.count) + " WHERE id = " + utils.convertToValue(export_detail.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(export_detail) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM export_detail WHERE id = " + utils.convertToValue(export_detail.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}