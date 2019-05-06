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
            if (utils.checkObj(options.name)) {
                add_codition = add_codition + " AND name LIKE " + utils.convertToLikeValue(options.name);
            }
            if (utils.checkObj(options.phone)) {
                add_codition = add_codition + " AND phone LIKE " + utils.convertToLikeValue(options.phone);
            }
            if (utils.checkObj(options.lowest_dob)) {
                add_codition = add_codition + " AND dob >= " + utils.convertToValue(options.lowest_dob);
            }
            if (utils.checkObj(options.highest_dob)) {
                add_codition = add_codition + " AND dob <= " + utils.convertToValue(options.highest_dob);
            }
            
            let sql = "SELECT * FROM customer"  + add_codition;
            db.query(sql, function(err, result, field) {
                if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(customer) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO customer VALUES (NULL, " + utils.convertToValue(customer['name']) + ", " + utils.convertToValue(customer['phone']) +
            ", " + utils.convertToValue(customer['dob']) +")";
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(customer) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE customer SET name = " + utils.convertToValue(customer.name) + ", phone = " + utils.convertToValue(customer.phone)
            + ", dob = " + utils.convertToValue(customer.dob) + " WHERE id = " + utils.convertToValue(customer.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(customer) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM customer WHERE id = " + utils.convertToValue(customer.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}