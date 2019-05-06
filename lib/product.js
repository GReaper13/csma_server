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
            if (utils.checkObj(options.description)) {
                add_codition = add_codition + " AND description LIKE " + utils.convertToLikeValue(options.description);
            }
            if (utils.checkObj(options.lowest_import_price)) {
                add_codition = add_codition + " AND import_price >= " + utils.convertToValue(options.lowest_import_price);
            }
            if (utils.checkObj(options.highest_import_price)) {
                add_codition = add_codition + " AND import_price <= " + utils.convertToValue(options.highest_import_price);
            }
            if (utils.checkObj(options.lowest_export_price)) {
                add_codition = add_codition + " AND export_price >= " + utils.convertToValue(options.lowest_export_price);
            }
            if (utils.checkObj(options.highest_export_price)) {
                add_codition = add_codition + " AND export_price <= " + utils.convertToValue(options.highest_export_price);
            }
            if (utils.checkObj(options.available)) {
                add_codition = add_codition + " AND available = " + utils.convertToValue(options.available);
            }
            let sql = "SELECT * FROM product " + add_codition + " ORDER BY id DESC LIMIT " + options.index + ", " + options.count;
            db.query(sql, function(err, result, field) {
				if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(product) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO product VALUES (NULL, " + utils.convertToValue(product['name']) + ", " + utils.convertToValue(product['description']) +
            ", " + utils.convertToValue(product['import_price']) + ", " + utils.convertToValue(product['export_price']) + ", '1')"
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(product) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE product SET name = " + utils.convertToValue(product.name) + ", description = " + utils.convertToValue(product.description)
            + ", import_price = " + utils.convertToValue(product.import_price) + ", export_price = " + utils.convertToValue(product.export_price) 
            + ", available = " + utils.convertToValue(product.available) + "WHERE id = " + utils.convertToValue(product.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(product) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM product WHERE id = " + utils.convertToValue(product.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}