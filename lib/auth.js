const utils = require("../utils")

module.exports = db => {

    function list(options, returnMany) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM auth";
            var countVar = 0;
            var optionsDataArr = [];
            if(options.id) {
                countVar++;
                if(countVar > 0 && countVar < 2) sql = sql + " WHERE";
                else if(countVar >= 2) sql + " AND";
                sql = sql + " id = ?";
                optionsDataArr.push('' + options.id);
            };

            if(options.username) {
                countVar++;
                if(countVar > 0 && countVar < 2) sql = sql + " WHERE";
                else if(countVar >= 2) sql + " AND";
                sql = sql + " username = ?"
                optionsDataArr.push('' + options.username);
            };
            db.query(sql, optionsDataArr, (err, result) => {
                if(err) reject(err);
                var dataArr = JSON.parse(JSON.stringify(result));
                if(dataArr.length > 0) {
                    if(returnMany) resolve(dataArr);
                    else resolve(dataArr[0]);
                } else {
                    resolve(undefined);
                }
            })
        })
    }

    function add(auth) {
        return new Promise((resolve, reject) => {
            var sql = "INSERT INTO auth (username, password, member_id) VALUES ("
                + utils.convertToValue(auth['username']) + ", "
                + utils.convertToValue(auth['password']) + ", "
                + utils.convertToValue(auth['member_id'])+ ")";
                
            db.query(sql, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }

    return {
        list,
        add
    }
}