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
                    let orCondition = "member.id = '0'"
                    options.id.forEach(element => {
                        orCondition = orCondition + " OR member.id = " + utils.convertToValue(element);
                    });
                    add_codition =  add_codition + " AND (" + orCondition + ")";
                } else {
                    add_codition = add_codition + " AND member.id = " + utils.convertToValue(options.id);
                }
            }
            if (utils.checkObj(options.name)) {
                add_codition = add_codition + " AND member.name LIKE " + utils.convertToLikeValue(options.name);
            }
            if (utils.checkObj(options.address)) {
                add_codition = add_codition + " AND member.address LIKE " + utils.convertToLikeValue(options.address);
            }
            if (utils.checkObj(options.phone_number)) {
                add_codition = add_codition + " AND member.phone_number LIKE " + utils.convertToLikeValue(options.phone_number);
            }
            if (utils.checkObj(options.role_id)) {
                add_codition = add_codition + " AND member.role_id = " + utils.convertToValue(options.role_id);
            }
            if (utils.checkObj(options.lowest_salary)) {
                add_codition = add_codition + " AND member.salary >= " + utils.convertToValue(options.lowest_salary);
            }
            if (utils.checkObj(options.highest_salary)) {
                add_codition = add_codition + " AND member.salary <= " + utils.convertToValue(options.highest_salary);
            }
            if (utils.checkObj(options.status)) {
                add_codition = add_codition + " AND member.status = " + utils.convertToValue(options.status);
            }
            if (utils.checkObj(options.store_id)) {
                add_codition = add_codition + " AND member.store_id = " + utils.convertToValue(options.store_id);
            }
            let sql = "SELECT *, member.id as id, member.name as name, member.address as address, store.name as storeName, role.name as roleName, store.address as storeAddress"
            + " FROM member INNER JOIN role ON member.role_id = role.id INNER JOIN store ON member.store_id = store.id" + add_codition;
            db.query(sql, function(err, result, field) {
                if (err) return reject(10002);
                result.forEach(element => {
                    let role = {id: element.role_id, name: element.roleName};
                    let store = {id: element.store_id, name: element.storeName, address: element.storeAddress};
                    element.role = role;
                    element.store = store;
                    delete(element.role_id);
                    delete(element.roleName);
                    delete(element.store_id);
                    delete(element.storeName);
                    delete(element.storeAddress);
                });
				resolve(result);
			});
        })
    }

    function add(member) {
        return new Promise(function(resolve, reject) {
            let sql = "INSERT INTO member VALUES (NULL, " + utils.convertToValue(member['name']) + ", " + utils.convertToValue(member['address']) +
            ", " + utils.convertToValue(member['phone_number']) + ", " + utils.convertToValue(member['role_id']) + ", " + utils.convertToValue(member['salary'])
            + ", '1'" + ", " + utils.convertToValue(member['store_id']) +")";
            db.query(sql, function(err, result) {
                if (err) return reject(10002);
                resolve(1000)
            });
        });
    }

    function update(member) {
        return new Promise(function(resolve, reject) {
            let sql = "UPDATE member SET name = " + utils.convertToValue(member.name) + ", address = " + utils.convertToValue(member.address)
            + ", phone_number = " + utils.convertToValue(member.phone_number) + ", role = " + utils.convertToValue(member.role) 
            + ", salary = " + utils.convertToValue(member.role) + ", status = " + utils.convertToValue(member.status) + ", store_id = " + utils.convertToValue(member.store_id) 
            + " WHERE id = " + utils.convertToValue(member.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000);
            });
        });
    }

    function remove(member) {
        return new Promise(function(resolve, reject) {
            let sql = "DELETE FROM member WHERE id = " + utils.convertToValue(member.id);
            db.query(sql, function(err, result) {
                if (err) reject(10002);
                resolve(1000)
            });
        });
    }
}