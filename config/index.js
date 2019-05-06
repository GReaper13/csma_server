var db = require('./db');
module.exports =  {
    connectDb : function () {
        return db.connect()
    }
}