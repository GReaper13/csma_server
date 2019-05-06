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
                if (options.id.constructor == Array) {
                    let orCondition = "id = '0'"
                    options.id.forEach(element => {
                        orCondition = orCondition + " OR id = " + utils.convertToValue(element);
                    });
                    add_codition =  add_codition + " AND (" + orCondition + ")";
                } else {
                    add_codition = add_codition + " AND id = " + utils.convertToValue(options.id);
                }
            }
            if (utils.checkObj(options.staff_id)) {
                add_codition = add_codition + " AND staff_id = " + utils.convertToValue(options.staff_id);
            }
            if (utils.checkObj(options.customer_id)) {
                add_codition = add_codition + " AND customer_id = " + utils.convertToValue(options.customer_id);
            }
            if (utils.checkObj(options.lowest_date)) {
                add_codition = add_codition + " AND date >= " + utils.convertToValue(options.lowest_date);
            }
            if (utils.checkObj(options.highest_date)) {
                add_codition = add_codition + " AND date <= " + utils.convertToValue(options.highest_date);
            }
            
            let sql = "SELECT * FROM export"  + add_codition;
            db.query(sql, function(err, result, field) {
                if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(options) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO export VALUES (NULL, " + utils.convertToValue(options['date'])
            + ", " + utils.convertToValue(options['staff_id']) + ", " + utils.convertToValue(options['customer_id']) + ")";
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(options) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE export SET date = " + utils.convertToValue(options.date)
            + ", staff_id = " + utils.convertToValue(options.staff_id) + ", customer_id = " + utils.convertToValue(options.customer_id) + " WHERE id = " + utils.convertToValue(options.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(options) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM export WHERE id = " + utils.convertToValue(options.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}