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
            if (utils.checkObj(options.address)) {
                add_codition = add_codition + " AND address LIKE " + utils.convertToLikeValue(options.address);
            }
        
            let sql = "SELECT * FROM store"  + add_codition;
            db.query(sql, function(err, result, field) {
                if (err) return reject(10002);
				resolve(result);
			});
        })
    }

    function add(store) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO store VALUES (NULL, " + utils.convertToValue(store['name']) + ", " + utils.convertToValue(store['address']) + ")";
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(store) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE store SET name = " + utils.convertToValue(store.name) + ", address = " + utils.convertToValue(store.address)
             + " WHERE id = " + utils.convertToValue(store.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(store) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM store WHERE id = " + utils.convertToValue(store.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}